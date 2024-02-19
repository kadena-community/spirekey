import { Account } from '@/context/AccountsContext';
import { useState } from 'react';
import AccountNetwork from './AccountNetwork';
import Alias from './Alias';
import Card from './Card';
import CardBottom from './CardBottom';
import DeviceIcons from './DeviceIcons';

type CardProps = {
  account: Account;
  balancePercentage?: number;
  isLoading?: boolean;
};

export default function DeviceCard({
  account,
  balancePercentage = 10,
  isLoading,
}: CardProps) {
  // @todo: use the color of a specific device
  const color = account.devices[0].color;
  // @todo: check isRegistered for a specific device
  const hasPendingTX = !!account.devices[0].pendingRegistrationTx;

  return (
    <Card
      color={color}
      balancePercentage={balancePercentage}
      title={<Alias title={account.alias} />}
      icons={<DeviceIcons account={account} />}
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
