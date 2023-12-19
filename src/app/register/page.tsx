"use client";

import { AccountSelector } from "@/components/AccountSelector";
import { AddDevice } from "@/components/AddDevice";
import { Loader } from "@/components/CreateWalletLoader/Loader";
import { type Device, type Account } from "@/context/AccountContext";
import { useAccounts } from "@/hooks/useAccounts";
import { useSign } from "@/hooks/useSign";
import { ContentHeader, Stack, Text } from "@kadena/react-ui";
import { useState } from "react";
import { addDevice } from "./addDevice";
import { registerAccount } from "@/utils/register";
import { FundAccount } from "@/components/FundAccount";

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
  const { activeAccount, activeDevice, handleRestoreAccount } = useAccounts();
  const { sign } = useSign(process.env.WALLET_URL!);

  const handleAddDevice = async (newDevice: Device) => {
    setLoading(true);
    const caccount = await registerOrAddDevice(
      activeDevice ?? null,
      newDevice,
      activeAccount ?? null
    );

    setLoading(false);

    if (!activeDevice) {
      setResult(caccount);
      handleRestoreAccount({
        caccount,
        networkId: process.env.NETWORK_ID!,
        namespace: process.env.NAMESPACE!,
      });
      return;
    }

    // navigate to sign page of "original device"
    // for now we just go to this wallet's sign page
    sign(result, activeDevice, "/pact/submit");
  };

  if (isLoading) {
    return (
      <Stack direction="column" gap="$md" margin="$md">
        <ContentHeader
          heading="Account"
          description="Create an account using WebAuthN"
          icon="Account"
        />
        <div>
          <Text>loading...</Text>
          <Loader />
        </div>
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

        <FundAccount />
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

      <AccountSelector />

      <AddDevice onAddDevice={handleAddDevice} />
    </Stack>
  );
}
