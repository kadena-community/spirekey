"use client";

import { Account, Device, useAccounts } from "@/hooks/useAccounts";
import {
  Box,
  Button,
  ContentHeader,
  SelectField,
  Stack,
  Text,
  TextField,
  TrackerCard,
} from "@kadena/react-ui";
import { useCallback } from "react";
import { l1Client } from "@/utils/client";

type LoginProps = {
  searchParams: {
    returnUrl: string;
  };
};

export default function Login({ searchParams }: LoginProps) {
  const { returnUrl } = searchParams;
  const { accounts, account, device, content } = useAccountSelector({});
  return (
    <Stack direction="column" alignItems="center" paddingY="$lg">
      <Box>
        <ContentHeader
          description={`Which account do you want to use to identify on ${searchParams.returnUrl}?`}
          heading="Login"
          icon="Account"
        />
        {content}
        {account && device && (
          <Stack
            direction="row"
            gap="$xl"
            justifyContent="flex-end"
            marginY="$md"
          >
            <Button as="a" href={returnUrl} variant="alternative">
              Cancel
            </Button>
            <Button
              as="a"
              href={`${returnUrl}?response=${Buffer.from(
                JSON.stringify({
                  name: device.name,
                  waccount: account.name,
                  caccount: account.account,
                  cid: device["credential-id"],
                  publicKey: device.guard.keys[0],
                })
              ).toString("base64")}`}
            >
              Login
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

const useAccountSelector = ({
  onChange,
}: {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { accounts, account, device, setDevice, setAccount } =
    useAccounts(l1Client);
  const onAccountChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const acc = accounts.find((acc) => acc.account === event.target.value);
      if (!acc) return;
      setAccount(acc);
      setDevice(acc.devices[0]);
    },
    [setAccount, accounts]
  );
  return {
    accounts,
    account,
    device,
    content: (
      <AccountSelectorContent
        accounts={accounts}
        account={account}
        device={device}
        onAccountChange={onAccountChange}
      />
    ),
  };
};

const AccountSelectorContent = ({
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
