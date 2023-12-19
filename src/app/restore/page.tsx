"use client";

import { useAccounts } from "@/hooks/useAccounts";
import { l1Client } from "@/utils/client";
import {
  Button,
  Card,
  ContentHeader,
  Divider,
  SelectField,
  Stack,
  TextField,
} from "@kadena/react-ui";
import { useForm } from "react-hook-form";

const FORM_DEFAULT = {
  caccount: "",
  networkId: "fast-development",
  fromNetworkId: "fast-development",
  namespace: process.env.NAMESPACE || "",
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
    const { caccount, namespace, networkId } = getValues();
    try {
      await onRestore({ caccount, networkId, namespace });
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
          heading="Target network"
          description="On which network do you want to restore your account?"
          icon="Account"
        />
        <SelectField
          label="Network"
          selectProps={{
            id: "networkId",
            ariaLabel: "network",
            ...register("networkId"),
          }}
        >
          <option value="mainnet01">mainnet01</option>
          <option value="testnet04">testnet04</option>
          <option value="fast-development">fast-development</option>
        </SelectField>
        <Divider />
        <ContentHeader
          heading="Source network"
          description="From which network do you want to restore your account?"
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
          label="From Network"
          selectProps={{
            id: "fromNetworkId",
            ariaLabel: "from network",
            ...register("fromNetworkId"),
          }}
          helperText={"Select the network you want to restore from"}
        >
          <option value="mainnet01">mainnet01</option>
          <option value="testnet04">testnet04</option>
          <option value="fast-development">fast-development</option>
        </SelectField>
        <TextField
          label="account"
          inputProps={{ id: "namespace", ...register("namespace") }}
          helperText={
            "Enter the namespace of the account you want to restore, this should look like n_hash"
          }
        />
        <Button onClick={onRestoreAccount}>Restore</Button>
      </Card>
    </Stack>
  );
}
