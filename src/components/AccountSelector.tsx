import { fundAccount } from "@/app/register/fund";
import { useAccounts } from "@/hooks/useAccounts";
import {
  Button,
  SelectField,
  Stack,
  Text,
  TextField,
  TrackerCard,
} from "@kadena/react-ui";

export const AccountSelector = () => {
  const {
    accounts,
    activeAccount,
    activeDevice,
    handleRestoreAccount,
    handleAccountChange,
    handleDeviceChange,
  } = useAccounts();

  const onAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    handleAccountChange(event.target.value);

  const handleFundAccount = async () => {
    if (!activeAccount) throw new Error("No account selected");
    await fundAccount(activeAccount);
    window.location.reload();
  };

  if (!activeAccount)
    return (
      <Stack direction="column" gap="$md">
        <TextField
          label="Restore existing account"
          inputProps={{
            id: "account",
          }}
          helperText="Enter the account name you want to restore"
        />
        <Button
          onClick={(e: any) => {
            console.log("e.target.value", e.target.value);
            return handleRestoreAccount({
              caccount: e.target.value,
              networkId: process.env.NETWORK_ID!,
              namespace: process.env.NAMESPACE!,
            });
          }}
        >
          Restore
        </Button>
      </Stack>
    );

  if (!activeDevice)
    return <Text>No account found, please register first.</Text>;

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
            value: activeAccount.account,
            isAccount: true,
          },
          {
            label: "Display Name",
            value: activeDevice.name,
          },
          {
            label: "Balance",
            value: activeAccount.balance,
          },
        ]}
        helperText="This is the account you will use to login."
      />

      {activeAccount.devices.length > 1 && (
        <SelectField
          label="device"
          selectProps={{
            id: "device",
            ariaLabel: "Select which device you'd like to use",
            onChange: handleDeviceChange,
          }}
        >
          {activeAccount.devices.map((device) => (
            <option
              value={device["credential-id"]}
              key={device["credential-id"]}
            >
              {device["credential-id"]}
            </option>
          ))}
        </SelectField>
      )}

      <Button onClick={handleFundAccount}>Fund account</Button>
    </>
  );
};
