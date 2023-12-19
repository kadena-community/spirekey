"use client";

import { useAccounts } from "@/hooks/useAccounts";
import { l1Client } from "@/utils/client";
import {
  Button,
  Card,
  ContentHeader,
  SelectField,
  Stack,
  TextField,
} from "@kadena/react-ui";
import { useForm } from "react-hook-form";

const FORM_DEFAULT = {
  caccount: "",
  network: "fast-development",
  fromNetwork: "fast-development",
  host: "",
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
  const onRestoreAccount = async () => {
    const { caccount } = getValues();
    try {
      await onRestore(caccount);
    } catch (error) {
      if (error instanceof Error)
        return setError("caccount", { message: error.message });
      return setError("caccount", { message: "Unknown error" });
    }
  };
  return (
    <Stack direction="column" gap="$md" margin="$md">
      <Card fullWidth>
        <ContentHeader
          heading="WebAuthn Wallet"
          description="On which network do you want to restore your account?"
          icon="Account"
        />
        <SelectField
          label="Network"
          selectProps={{
            id: "network",
            ariaLabel: "network",
            ...register("network"),
          }}
        >
          <option value="mainnet01">mainnet01</option>
          <option value="testnet04">testnet04</option>
          <option value="fast-development">fast-development</option>
        </SelectField>
      </Card>
      <Card fullWidth>
        <ContentHeader
          heading="From selected network"
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
        <Button onClick={onRestoreAccount}>Restore</Button>
      </Card>
      <Card fullWidth>
        <ContentHeader
          heading="From another network"
          description="Restore an account from another network"
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
        <SelectField
          label="Network"
          selectProps={{
            id: "network",
            ariaLabel: "network",
            ...register("network"),
          }}
        >
          <option value="mainnet01">mainnet01</option>
          <option value="testnet04">testnet04</option>
          <option value="fast-development">fast-development</option>
        </SelectField>
        <TextField
          label="host"
          inputProps={{ id: "host", ...register("host") }}
          helperText="Leave the host empty to use the default host"
        />
      </Card>
    </Stack>
  );
}
