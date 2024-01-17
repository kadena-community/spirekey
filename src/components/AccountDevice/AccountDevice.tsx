import { MaskedValue, Stack } from '@kadena/react-ui';
import { ReactNode } from 'react';
import { container } from './AccountDevices.css';

interface AccountDeviceProps {
  name: string;
  network: string;
  balance: string;
  icon: ReactNode;
  color: string;
}

export function AccountDevice(props: AccountDeviceProps) {
  const { name, network, balance, icon, color } = props;
  return (
    <div className={container} style={{ borderColor: color }}>
      <Stack justifyContent={'space-between'}>
        <MaskedValue value={name} startUnmaskedValues={8} />
        <div>{icon}</div>
      </Stack>
      <Stack justifyContent={'space-between'}>
        <div>{network}</div>
        <div>{balance}</div>
      </Stack>
      <div>{color}</div>
    </div>
  );
}
