"use client";

import { useAccounts } from "@/hooks/useAccounts";
import { l1Client } from "@/utils/client";
import {
  Button,
  Card,
  ContentHeader,
  Stack,
  TextField,
} from "@kadena/react-ui";
import { useForm } from "react-hook-form";

const FORM_DEFAULT = {
  caccount: "",
};
export type RestoreFormValues = typeof FORM_DEFAULT;

export default function RestorePage() {
  const { register, getValues, setError, formState } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: "onBlur",
  });
  const { handleRestoreAccount } = useAccounts();

  const yolo = async () => {
    const { caccount } = getValues();
    try {
      await handleRestoreAccount({
        caccount,
        networkId: process.env.NETWORK_ID!,
        namespace: process.env.NAMESPACE!,
      });
    } catch (error) {
      if (error instanceof Error) {
        return setError("caccount", { message: error.message });
      }

      return setError("caccount", { message: "Unknown error" });
    }
  };
  return (
    <Stack direction="column" gap="$md" margin="$md">
      <Card fullWidth>
        <ContentHeader
          heading="WebAuthn Wallet"
          description="Restore an account using c:account"
          icon="Account"
        />
        <TextField
          label="account"
          inputProps={{ id: "caccount", ...register("caccount") }}
          status={formState.errors.caccount ? "negative" : undefined}
          helperText={
            formState.errors.caccount?.message ||
            "Enter the account name you want to restore, this should look like c:account"
          }
        />
        <Button onClick={yolo}>Restore</Button>
      </Card>
    </Stack>
  );
}
