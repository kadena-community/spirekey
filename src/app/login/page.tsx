"use client";

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
import { useCallback, useEffect, useState } from "react";
import { getAccount } from "../utils/account";

type LoginProps = {
  searchParams: {
    returnUrl: string;
  };
};

type Account = {
  name: string;
  account: string;
  balance: string;
  devices: Device[];
};

type Device = {
  ["credential-id"]: string;
  ["credential-pubkey"]: string;
};

export default function Login({ searchParams }: LoginProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [account, setAccount] = useState<Account | null>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const onAccountChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const acc = accounts.find((acc) => acc.account === event.target.value);
      if (!acc) return;
      setAccount(acc);
      setDevice(acc.devices[0]);
    },
    [setAccount, accounts]
  );
  useEffect(() => {
    const accounts = localStorage.getItem("accounts");
    if (!accounts) return;
    const accs = JSON.parse(accounts);
    Promise.all(
      accs.map(async (acc: string) => ({
        name: acc,
        account: await getAccount(acc),
      }))
    )
      .then((accs) => {
        return accs.map(({ name, account }) => {
          return {
            name,
            account: account.name,
            devices: account.devices,
            balance: account.balance,
          };
        });
      })
      .then((accs) => {
        setAccounts(accs);
        setAccount(accs[0]);
        if (accs[0].devices.length === 1) setDevice(accs[0].devices[0]);
      });
  }, []);
  return (
    <Stack direction="column" alignItems="center" paddingY="$lg">
      <Box>
        <ContentHeader
          description={`Which account do you want to use to identify on ${searchParams.returnUrl}?`}
          heading="Login"
          icon="Account"
        />
        <AccountSelector
          accounts={accounts}
          account={account}
          returnUrl={searchParams.returnUrl}
          device={device}
          onChange={onAccountChange}
        />
      </Box>
    </Stack>
  );
}

const AccountSelector = ({
  accounts,
  account,
  device,
  returnUrl,
  onChange,
}: {
  accounts: Account[];
  account: Account | null;
  device: Device | null;
  returnUrl: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
          onChange,
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
            value: account.name,
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
      <Stack direction="row" gap="$xl" justifyContent="flex-end" marginY="$md">
        <Button as="a" href={returnUrl} variant="alternative">
          Cancel
        </Button>
        <Button
          as="a"
          href={`${returnUrl}?response=${Buffer.from(
            JSON.stringify({
              name: account.name,
              account: account.account,
              cid: device["credential-id"],
              publicKey: device["credential-pubkey"],
            })
          ).toString("base64")}`}
        >
          Login
        </Button>
      </Stack>
    </>
  );
};
