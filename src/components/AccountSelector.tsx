import { Account, Device } from "@/hooks/useAccounts";
import { SelectField, Text, TextField, TrackerCard } from "@kadena/react-ui";
import { useCallback } from "react";

export const AccountSelector = ({
  account,
  accounts,
  device,
  onAccountChange,
}: {
  accounts: Account[];
  account: Account | null;
  device: Device | null;
  onAccountChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onStoreAccount?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  const onStoreAccount = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      localStorage.setItem("accounts", JSON.stringify([event.target.value]));
    },
    []
  );
  if (!account)
    return (
      <TextField
        label="account"
        inputProps={{ id: "account", onBlur: onStoreAccount }}
      />
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
    </>
  );
};
