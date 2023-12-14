"use client";

import { AccountSelector } from "@/components/AccountSelector";
import { AddDevice } from "@/components/AddDevice";
import { Account, Device } from "@/hooks/useAccounts";
import { useAccountSelector } from "@/hooks/useAccountSelector";
import { useSign } from "@/hooks/useSign";
import { Button, ContentHeader, Stack, Text } from "@kadena/react-ui";
import { useCallback, useState } from "react";
import { addDevice } from "./addDevice";
import { fundAccount } from "./fund";
import { registerAccount } from "./register";

const registerOrAddDevice = async (
  signingDevice: Device | null,
  device: Device,
  account: Account | null
) => {
  if (!account || !signingDevice)
    return registerAccount({
      displayName: device.name,
      credentialId: device["credential-id"],
      credentialPubkey: device.guard.keys[0],
      domain: device.domain,
    });
  return addDevice(signingDevice, account, device);
};

export default function Account() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>();
  const {
    accounts,
    account,
    device,
    onAccountChange,
    onDeviceChange,
    onRestore,
  } = useAccountSelector();
  const { sign } = useSign("http://localhost:1337");
  const onFundAccount = async () => {
    if (!account) throw new Error("No account selected");
    await fundAccount(account);
    window.location.reload();
  };
  const onAddDevice = useCallback(
    async (newDevice: Device) => {
      setLoading(true);
      const result = await registerOrAddDevice(device, newDevice, account);
      setLoading(false);
      if (!device) {
        setResult(result);
        onRestore(result);
        return;
      }
      // navigate to sign page of "original device"
      // for now we just go to this wallet's sign page
      sign(result, device, "/pact/submit");
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
        <Button onClick={onFundAccount}>Fund account</Button>
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
        onDeviceChange={onDeviceChange}
        onRestore={onRestore}
      />
      <AddDevice onAddDevice={onAddDevice} />
    </Stack>
  );
}
