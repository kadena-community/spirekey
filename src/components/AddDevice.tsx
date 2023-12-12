import { Device } from "@/hooks/useAccounts";
import { Button, Stack, TextField } from "@kadena/react-ui";
import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
  startRegistration,
} from "@simplewebauthn/browser";
import { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";
import cbor from "cbor";
import { useCallback, useState } from "react";

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

export const AddDevice = ({
  onAddDevice,
}: {
  onAddDevice: (device: Device) => void;
}) => {
  const [account, setAccount] = useState<string>("");
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
    onAddDevice({
      domain: window.location.hostname,
      name: account,
      ["credential-id"]: res.id,
      guard: {
        keys: [pubKey],
        pred: "keys-any",
      },
    });
  }, [account, onAddDevice]);
  return (
    <Stack direction="column">
      <TextField
        label="account"
        inputProps={{
          id: "account",
          value: account,
          onChange: onAccountChange,
        }}
        helperText="Enter your account name"
      />
      <Button onClick={register}>Add Device</Button>
    </Stack>
  );
};
