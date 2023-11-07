"use client";

import {
  Box,
  Button,
  ContentHeader,
  SelectField,
  Stack,
  Text,
  TrackerCard,
} from "@kadena/react-ui";
import { useEffect, useState } from "react";

type LoginProps = {
  searchParams: {
    returnUrl: string;
  };
};

type Account = {
  cid: string;
  name: string;
  account: string;
  publicKey: string;
  balance: string;
};

export default function Login({ searchParams }: LoginProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [account, setAccount] = useState<Account | null>(null);
  useEffect(() => {
    const accounts = localStorage.getItem("accounts");
    if (!accounts) return;
    const accs = JSON.parse(accounts);
    setAccounts(accs);
    setAccount(accs[0]);
  }, []);
  return (
    <Stack direction="column" alignItems="center" marginY="$lg">
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
        />
      </Box>
    </Stack>
  );
}

const AccountSelector = ({
  accounts,
  account,
  returnUrl,
}: {
  accounts: Account[];
  account: Account | null;
  returnUrl: string;
}) => {
  if (!account) return <Text>No account found, please register first.</Text>;
  return (
    <>
      <SelectField
        label="account"
        selectProps={{ id: "account", ariaLabel: "Select your account" }}
      >
        {accounts.map((account) => (
          <option value={account.account} key={account.cid}>
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
      <Stack direction="row" gap="$xl" justifyContent="flex-end" marginY="$md">
        <Button as="a" href={returnUrl} variant="alternative">
          Cancel
        </Button>
        <Button
          as="a"
          href={`${returnUrl}?response=${Buffer.from(
            JSON.stringify(account)
          ).toString("base64")}`}
        >
          Login
        </Button>
      </Stack>
    </>
  );
};
