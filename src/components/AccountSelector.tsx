import { useAccounts } from '@/hooks/useAccounts';
import {
  Button,
  SelectField,
  Stack,
  Text,
  TextField,
  TrackerCard,
} from '@kadena/react-ui';
import { FormEvent } from 'react';
import { FundAccount } from './FundAccount';

export const AccountSelector = () => {
  const {
    accounts,
    activeAccount,
    activeDevice,
    handleRestoreAccount,
    setActiveAccount,
    setActiveDevice,
  } = useAccounts();

  const onAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setActiveAccount(event.target.value);

  const onDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setActiveDevice(event.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      account: { value: string };
    };

    const value = target.account.value ?? '';
    return handleRestoreAccount({
      caccount: value,
      networkId: process.env.NETWORK_ID!,
      namespace: process.env.NAMESPACE!,
    });
  };

  if (!activeAccount)
    return (
      <Stack flexDirection="column" gap="md">
        <form onSubmit={handleSubmit}>
          <TextField
            name="account"
            label="Restore existing account"
            {...{
              id: 'account',
            }}
            helperText="Enter the account name you want to restore"
          />
          <Button type="submit">Restore</Button>
        </form>
      </Stack>
    );

  if (!activeDevice)
    return <Text>No account found, please register first.</Text>;

  return (
    <>
      <SelectField
        label="account"
        {...{
          id: 'account',
          ariaLabel: 'Select your account',
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
            label: 'Account',
            value: activeAccount.account,
            isAccount: true,
          },
          {
            label: 'Display Name',
            value: activeDevice.name,
          },
          {
            label: 'Balance',
            value: activeAccount.balance,
          },
        ]}
        helperText="This is the account you will use to login."
      />

      {activeAccount.devices.length > 1 && (
        <SelectField
          label="device"
          {...{
            id: 'device',
            ariaLabel: "Select which device you'd like to use",
            onChange: onDeviceChange,
          }}
        >
          {activeAccount.devices.map((device) => (
            <option
              value={device['credential-id']}
              key={device['credential-id']}
            >
              {device['credential-id']}
            </option>
          ))}
        </SelectField>
      )}
    </>
  );
};
