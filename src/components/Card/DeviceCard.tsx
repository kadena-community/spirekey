import { Account } from '@/context/AccountsContext';
import AccountNetwork from './AccountNetwork';
import Alias from './Alias';
import Card from './Card';
import CardBottom from './CardBottom';
import DeviceIcons from './DeviceIcons';

type CardProps = {
  account: Account;
  onClick?: (account: Account) => void;
  balancePercentage?: number;
};

export default function DeviceCard({
  account,
  onClick = (account: Account) => {},
  balancePercentage = 10,
}: CardProps) {
  const uniqueDeviceTypes = new Set();
  account.devices.map((d) => uniqueDeviceTypes.add(d.deviceType));

  return (
    <Card
      account={account}
      onClick={onClick}
      balancePercentage={balancePercentage}
      title={<Alias title={account.alias} />}
      icons={<DeviceIcons account={account} />}
      center={<AccountNetwork account={account} />}
      cardBottom={<CardBottom account={account} />}
    />
  );
}
