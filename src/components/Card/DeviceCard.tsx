import { Account } from '@/context/AccountsContext';
import Card from './Card';
import Alias from './Alias';
import DeviceIcons from './DeviceIcons';
import AccountNetwork from './AccountNetwork';
import CardBottom from './CardBottom';

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
  account.devices.map((d) => uniqueDeviceTypes.add(d.identifier.split('_')[0]));

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
