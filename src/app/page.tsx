"use client";

import { registerAccount } from "@/utils/register";
import {
  Button,
  Card,
  ContentHeader,
  Stack,
  Text,
  TextField,
} from "@kadena/react-ui";
import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
  startRegistration,
} from "@simplewebauthn/browser";
import Link from "next/link";
import cbor from "cbor";
import { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader } from "@/components/CreateWalletLoader/Loader";
import { useAccounts } from "@/hooks/useAccounts";

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

const FORM_DEFAULT = {
  displayName: "",
};
const Register = () => {
  const { register, getValues } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: "onBlur",
  });
  const { storeAccount } = useAccounts();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const onRegister = async () => {
    const { displayName } = getValues();
    if (!displayName) throw new Error("Display name is required");
    setIsLoading(true);
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
        id: displayName + Date.now(),
        displayName: displayName,
        name: displayName,
      },
      timeout: 60000,
    });
    if (!res.response.publicKey)
      throw new Error("No public key returned from webauthn");

    const pubKey = await getPublicKey(res);

    const caccount = await registerAccount({
      credentialPubkey: pubKey,
      credentialId: res.id,
      displayName,
      domain: window.location.hostname,
    });
    await storeAccount(caccount);
    setIsLoading(false);
    setResult(caccount);
  };
  if (result)
    return (
      <Card fullWidth>
        <Stack direction="column" gap="$md" margin="$md">
          <ContentHeader
            heading="WebAuthn Wallet"
            description="Create an account using WebAuthn"
            icon="Account"
          />
          <Text>Your account has been forged successfully!</Text>
          <Text bold>{result}</Text>
        </Stack>
      </Card>
    );

  if (isLoading)
    return (
      <Card fullWidth>
        <Stack direction="column" gap="$md" margin="$md">
          <Text>Your wallet is forging...</Text>
          <Loader />
        </Stack>
      </Card>
    );
  return (
    <Card fullWidth>
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Create an account using WebAuthn"
          icon="Account"
        />
        <TextField
          label="Display Name"
          inputProps={{
            id: "display-name",
            ...register("displayName", { required: true }),
          }}
          info="This name is only for your convienience to recognize your device."
          helperText="This name will be stored on the blockchain, don't use any sensitive information."
        />
        <Button onClick={onRegister}>Register</Button>
      </Stack>
    </Card>
  );
};

const Restore = () => {
  return (
    <Card fullWidth>
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Restore an account using WebAuthn"
          icon="Account"
        />
        <Link href="/restore">Restore</Link>
      </Stack>
    </Card>
  );
};

export default function Home() {
  return (
    <Stack direction="column" gap="$md" margin="$md">
      <Register />
      <Restore />
    </Stack>
  );
}
