import { Account } from '@/context/AccountsContext';
import { getDeviceIcon } from '@/utils/getDeviceIcon';
import { Box, SystemIcon } from '@kadena/react-ui';
import { device } from './Card.css';

type DeviceIconsProps = {
  account: Account;
};

export default function DeviceIcons({ account }: DeviceIconsProps) {
  const uniqueDeviceTypes = new Set<string>();
  account.devices.map((d) => uniqueDeviceTypes.add(d.deviceType));

  return Array.from(uniqueDeviceTypes).map((type, i) => {
    const icon = getDeviceIcon(type);
    return (
      <Box key={i} className={device}>
        {icon}
      </Box>
    );
  });
}
