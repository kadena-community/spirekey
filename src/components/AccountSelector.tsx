import { fundAccount } from "@/app/register/fund";
import { Account, Device } from "@/hooks/useAccounts";
import {
  Button,
  SelectField,
  Stack,
  Text,
  TextField,
  TrackerCard,
} from "@kadena/react-ui";
import { useCallback, useState } from "react";

export const AccountSelector = ({
  account,
  accounts,
  device,
  onRestore,
  onAccountChange,
  onDeviceChange,
}: {
  accounts: Account[];
  account: Account | null;
  device: Device | null;
  onRestore: (account: string) => Promise<void>;
  onAccountChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDeviceChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onStoreAccount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [restoreAccount, setRestoreAccount] = useState<string>("");
  const onStoreAccount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRestoreAccount(event.target.value);
    },
    []
  );
  const onFundAccount = async () => {
    if (!account) throw new Error("No account selected");
    await fundAccount(account);
    window.location.reload();
  };
  const onRestoreAccount = useCallback(async () => {
    onRestore(restoreAccount);
  }, [restoreAccount, onAccountChange]);
  if (!account)
    return (
      <Stack direction="column" gap="$md">
        <TextField
          label="Restore existing account"
          inputProps={{ id: "account", onBlur: onStoreAccount }}
          helperText="Enter the account name you want to restore"
        />
        <Button onClick={onRestoreAccount}>Restore</Button>
      </Stack>
    );
  if (!device) return <Text>No account found, please register first.</Text>;
  return (
    <>
      <SelectField
        label="account"
        selectProps={{
          id: "account",
          ariaLabel: "Select your account",
          onChange: onAccountChange,
        }}
      >
        {accounts.map((account) => (
          <option value={account.account} key={account.account}>
            {account.name}
          </option>
        ))}
      </SelectField>
      <TrackerCard
        icon="ManageKda"
        labelValues={[
          {
            label: "Account",
            value: account.account,
            isAccount: true,
          },
          {
            label: "Display Name",
            value: device.name,
          },
          {
            label: "Balance",
            value: account.balance,
          },
        ]}
        helperText="This is the account you will use to login."
      />
      {account.devices.length > 1 && (
        <SelectField
          label="device"
          selectProps={{
            id: "device",
            ariaLabel: "Select which device you'd like to use",
            onChange: onDeviceChange,
          }}
        >
          {account.devices.map((device) => (
            <option
              value={device["credential-id"]}
              key={device["credential-id"]}
            >
              {device["credential-id"]}
            </option>
          ))}
        </SelectField>
      )}
      <Button onClick={onFundAccount}>Fund account</Button>
    </>
  );
};
