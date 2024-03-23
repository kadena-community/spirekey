import { Account, Device } from '@/context/AccountsContext';
import { useState } from 'react';
import AccountNetwork from './AccountNetwork';
import Alias from './Alias';
import Card from './Card';
import CardBottom from './CardBottom';
import DeviceIcons from './DeviceIcons';

type CardProps = {
  color: string;
  account: Account;
  device: Device;
  balancePercentage?: number;
  isLoading?: boolean;
};

export default function DeviceCard({
  color,
  account,
  device,
  balancePercentage = 10,
  isLoading,
}: CardProps) {
  // @todo: check isRegistered for a specific device
  const hasPendingTX = !!account.devices[0].pendingRegistrationTx;

  return (
    <Card
      color={color}
      balancePercentage={balancePercentage}
      title={<Alias title={account.alias} />}
      icons={<DeviceIcons account={account} device={device} />}
      center={
        <AccountNetwork
          account={account}
          isLoading={isLoading || hasPendingTX}
        />
      }
      cardBottom={<CardBottom account={account} />}
    />
  );
}
