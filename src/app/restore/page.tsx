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
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    setError,
    formState,
    control,
  } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: "onBlur",
  });
  const { onRestore } = useAccounts(l1Client);
  const onRestoreAccount = () => {
    const { caccount } = getValues();
    if (!caccount) {
      setError("caccount", { message: "Please enter an account name" });
      return;
    }
    console.log("Restore account", caccount);
    onRestore(caccount);
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
          helperText="Enter the account name you want to restore, this should look like c:account"
        />
        <Button onClick={onRestoreAccount}>Restore</Button>
      </Card>
    </Stack>
  );
}
