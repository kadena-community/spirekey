"use client";

import { AccountSelector } from "@/components/AccountSelector";
import { AddDevice } from "@/components/AddDevice";
import { Account, Device } from "@/hooks/useAccounts";
import { useAccountSelector } from "@/hooks/useAccountSelector";
import { ContentHeader, Stack, Text } from "@kadena/react-ui";
import { useCallback, useState } from "react";
import { addDevice } from "./addDevice";
import { registerAccount } from "./register";

const registerOrAddDevice = async (device: Device, account: Account | null) => {
  if (!account)
    return registerAccount({
      displayName: device.name,
      credentialId: device["credential-id"],
      credentialPubkey: device.guard.keys[0],
      domain: device.domain,
    });
  return addDevice(account, device);
};

export default function Account() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>();
  const { accounts, account, device, onAccountChange } = useAccountSelector();
  const onAddDevice = useCallback(
    async (device: Device) => {
      setLoading(true);
      const res = await registerOrAddDevice(device, account);
      setLoading(false);
      setResult(res);
    },
    [setResult, setLoading, account]
  );

  if (isLoading) {
    return (
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="Account"
          description="Create an account using WebAuthN"
          icon="Account"
        />
        <Text>Loading...</Text>
      </Stack>
    );
  }

  if (result) {
    return (
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="Account"
          description="Create an account using WebAuthN"
          icon="Account"
        />
        <Text>Registration complete! Account: {result}</Text>
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap="$md" margin="$md">
      <ContentHeader
        heading="Account"
        description="Create an account using WebAuthN"
        icon="Account"
      />
      <AccountSelector
        accounts={accounts}
        account={account}
        device={device}
        onAccountChange={onAccountChange}
      />
      <AddDevice onAddDevice={onAddDevice} />
    </Stack>
  );
}
