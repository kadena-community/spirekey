"use client";

import {
  Button,
  ContentHeader,
  Stack,
  Text,
  TextField,
} from "@kadena/react-ui";
import { useCallback, useState } from "react";
import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
  startRegistration,
} from "@simplewebauthn/browser";
import { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";
import cbor from "cbor";
import { registerAccount } from "./register";

const getPublicKey = async (res: RegistrationResponseJSON) => {
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

export default function Account() {
  const [account, setAccount] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>();
  const onAccountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAccount(e.target.value);
    },
    [setAccount]
  );

  const register = useCallback(async () => {
    const res = await startRegistration({
      challenge: bufferToBase64URLString(Buffer.from("some-random-string")),
      rp: {
        name: "Kadena WebAuthN Wallet",
        id: window.location.hostname,
      },
      pubKeyCredParams: [
        {
          alg: -7,
          type: "public-key",
        },
      ],
      authenticatorSelection: {
        requireResidentKey: true,
        userVerification: "preferred",
      },
      attestation: "direct",
      user: {
        id: account + Date.now(),
        displayName: account,
        name: account,
      },
      timeout: 60000,
    });
    if (!res.response.publicKey)
      throw new Error("No public key returned from webauthn");

    const pubKey = await getPublicKey(res);
    setLoading(true);
    const result = await registerAccount({
      domain: window.location.hostname,
      displayName: account,
      credentialId: res.id,
      credentialPubkey: pubKey,
    });

    const accounts = localStorage.getItem("accounts") || "[]";
    const accs = JSON.parse(accounts);
    localStorage.setItem("accounts", JSON.stringify([...accs, result]));
    setLoading(false);
    setResult(result);
  }, [account]);

  if (isLoading) {
    return (
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="Account"
          description="Create an account using WebAuthN"
          icon="Account"
        />
        <Text>Loading...</Text>
      </Stack>
    );
  }

  if (result) {
    return (
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="Account"
          description="Create an account using WebAuthN"
          icon="Account"
        />
        <Text>Registration complete! Account: {result}</Text>
      </Stack>
    );
  }

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
      <Button onClick={register}>Register</Button>
    </Stack>
  );
}
