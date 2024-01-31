import { Account } from '@/context/AccountsContext';
import AccountNetwork from './AccountNetwork';
import Alias from './Alias';
import Card from './Card';
import CardBottom from './CardBottom';
import DeviceIcons from './DeviceIcons';
import { deviceColors } from '@/styles/tokens.css';

type CardProps = {
  account: Account;
  balancePercentage?: number;
};

export default function DeviceCard({
  account,
  balancePercentage = 10,
}: CardProps) {
  const uniqueDeviceTypes = new Set();
  account.devices.map((d) => uniqueDeviceTypes.add(d.deviceType));

  // @todo: use the color of a specific device
  const color = deviceColors[account.devices[0].color];

  return (
    <Card
      color={color}
      balancePercentage={balancePercentage}
      title={<Alias title={account.alias} />}
      icons={<DeviceIcons account={account} />}
      center={<AccountNetwork account={account} />}
      cardBottom={<CardBottom account={account} />}
    />
  );
}
