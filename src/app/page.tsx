"use client";

import { Loader } from "@/components/CreateWalletLoader/Loader";
import { useAccounts } from "@/hooks/useAccounts";
import { registerAccount } from "@/utils/register";
import { getNewWebauthnKey } from "@/utils/webauthnKey";
import {
  Button,
  Card,
  ContentHeader,
  Stack,
  Text,
  TextField,
} from "@kadena/react-ui";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

    const { credentialId, publicKey } = await getNewWebauthnKey(displayName);

    const caccount = await registerAccount({
      credentialPubkey: publicKey,
      credentialId: credentialId,
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
