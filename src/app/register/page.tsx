"use client";

import {
  Button,
  ContentHeader,
  Select,
  Stack,
  TextField,
} from "@kadena/react-ui";
import { useCallback, useEffect, useState } from "react";
import {
  startRegistration,
  bufferToBase64URLString,
  base64URLStringToBuffer,
} from "@simplewebauthn/browser";
import { getAccountName, registerAccount } from "./register";
import { useRouter } from "next/navigation";
import cbor from "cbor";
import cosekey from "parse-cosekey";
import { l1Client } from "../utils/client";

type AccountProps = {
  searchParams: {
    payload: string;
    response: string;
  };
};

const getJosePublicKey = async (res: any) => {
  const { authData } = cbor.decode(
    base64URLStringToBuffer(res.response.attestationObject)
  );

  console.log(authData);

  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach((value: number, index: number) =>
    dataView.setUint8(index, value)
  );
  const credentialIdLength = dataView.getUint16(0);
  const publicKeyBytes = authData.slice(55 + credentialIdLength);

  // the publicKeyBytes are encoded again as CBOR
  const publicKeyObject = cbor.decode(publicKeyBytes);
  const jwk = cosekey.KeyParser.cose2jwk(publicKeyObject);
  const pubKey = Buffer.from(JSON.stringify(jwk)).toString("base64");
  return pubKey;
};

const getHexFromBase64 = async (res: any) => {
  return Buffer.from(base64URLStringToBuffer(res.response.publicKey)).toString(
    "hex"
  );
};

const getHexFromCbor = async (res: any) => {
  const { authData } = cbor.decode(
    base64URLStringToBuffer(res.response.attestationObject)
  );

  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach((value: number, index: number) =>
    dataView.setUint8(index, value)
  );
  const credentialIdLength = dataView.getUint16(0);
  const publicKeyBytes = authData.slice(55 + credentialIdLength);

  return Buffer.from(publicKeyBytes).toString("hex");
};

const getHexFromSubtle = async (res: any) => {
  const { authData } = cbor.decode(
    base64URLStringToBuffer(res.response.attestationObject)
  );

  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach((value: number, index: number) =>
    dataView.setUint8(index, value)
  );
  const credentialIdLength = dataView.getUint16(0);
  const publicKeyBytes = authData.slice(55 + credentialIdLength);

  const publicKeyObject = cbor.decode(publicKeyBytes);
  const jwk = cosekey.KeyParser.cose2jwk(publicKeyObject);
  const importedJWK = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["verify"]
  );
  const rawKey = await crypto.subtle.exportKey("raw", importedJWK);
  return Buffer.from(rawKey).toString("hex");
};

const getBase64PublicKey = async (res: any) => {
  return res.response.publicKey;
};

type PublicKeyType =
  | "jose"
  | "base64"
  | "hex-from-subtle-crypto"
  | "hex-from-base64"
  | "hex-from-cbor";
const getPublicKey = async (res: any, publicKeyType: PublicKeyType) => {
  switch (publicKeyType) {
    case "jose":
      return getJosePublicKey(res);
    case "base64":
      return getBase64PublicKey(res);
    case "hex-from-subtle-crypto":
      return getHexFromSubtle(res);
    case "hex-from-base64":
      return getHexFromBase64(res);
    case "hex-from-cbor":
      return getHexFromCbor(res);
    default:
      throw new Error("Invalid public key type");
  }
};

export default function Account(req: AccountProps) {
  const { payload, response } = req.searchParams;
  const router = useRouter();
  const [account, setAccount] = useState<string>("");
  const [publicKeyType, setPublicKeyType] = useState<PublicKeyType>(
    "hex-from-subtle-crypto"
  );
  const onAccountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAccount(e.target.value);
    },
    [setAccount]
  );
  const onPublicKeyTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPublicKeyType(e.target.value as PublicKeyType);
    },
    [setPublicKeyType]
  );
  useEffect(() => {
    if (!payload || !response) return;
    const p = JSON.parse(Buffer.from(payload, "base64").toString());
    const r = JSON.parse(Buffer.from(response, "base64").toString());
    const tx = {
      ...p,
      sigs: process.env.WEBAUTHN_MOCK
        ? p.sigs
        : [
            {
              sig: JSON.stringify({
                signature: Buffer.from(
                  base64URLStringToBuffer(r.response.signature)
                ).toString("base64"),
                authenticatorData: Buffer.from(
                  base64URLStringToBuffer(r.response.authenticatorData)
                ).toString("base64"),
                clientDataJSON: Buffer.from(
                  base64URLStringToBuffer(r.response.clientDataJSON)
                ).toString("base64"),
              }),
            },
            ...p.sigs,
          ],
    };
    l1Client.local(tx).then(async (res) => {
      if (res.result.status !== "success") {
        console.error(res);
        throw new Error("Transaction failed");
      }
      const txRes = await l1Client.submit(tx);
      await l1Client.listen(txRes);
    });
  }, [payload, response]);

  console.log(process.env.WEBAUTHN_MOCK);
  const register = useCallback(async () => {
    const accName = (await getAccountName(account)) as unknown as string;
    const res = await startRegistration({
      challenge: bufferToBase64URLString(Buffer.from("some-random-string")),
      rp: {
        name: "Kadena WebAuthN Wallet",
        id: "localhost",
      },
      pubKeyCredParams: [
        {
          alg: -7,
          type: "public-key",
        },
      ],
      authenticatorSelection: {
        residentKey: "required",
        requireResidentKey: true,
        userVerification: "preferred",
      },
      attestation: "direct",
      user: {
        id: accName,
        displayName: account,
        name: accName,
      },
      timeout: 60000,
    });
    console.log(res);
    if (!res.response.publicKey)
      throw new Error("No public key returned from webauthn");

    // currently only hex-from-cbor works
    const pubKey = await getPublicKey(res, "hex-from-cbor");
    const tx = await registerAccount({
      account: "andy",
      credentialId: res.id,
      credentialPubkey: pubKey,
    });

    router.push(
      `/sign?payload=${Buffer.from(JSON.stringify(tx)).toString(
        "base64"
      )}&returnUrl=/register`
    );
  }, [account, publicKeyType]);
  return (
    <Stack direction="column" gap="$md" margin="$md">
      <ContentHeader
        heading="Account"
        description="Create an account using WebAuthN"
        icon="Account"
      />
      <TextField
        label="account"
        inputProps={{
          id: "account",
          value: account,
          onChange: onAccountChange,
        }}
        helperText="Enter your account name"
      />
      <Select
        icon="KeyIconFilled"
        id="pubkeyType"
        ariaLabel="Public key type"
        onChange={onPublicKeyTypeChange}
      >
        <option value="hex-from-subtle-crypto">Hex - Subtle</option>
        <option value="hex-from-base64">Hex - base64</option>
        <option value="hex-from-cbor">Hex - cbor</option>
        <option value="jose">JOSE</option>
        <option value="base64">Base64</option>
      </Select>
      <Button onClick={register}>Register</Button>
    </Stack>
  );
}
