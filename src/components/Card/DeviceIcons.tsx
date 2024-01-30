import { Account } from '@/context/AccountsContext';
import { Box, SystemIcon } from '@kadena/react-ui';
import { device } from './Card.css';

type DeviceIconsProps = {
  account: Account;
};

export default function DeviceIcons({ account }: DeviceIconsProps) {
  const uniqueDeviceTypes = new Set();
  account.devices.map((d) => uniqueDeviceTypes.add(d.deviceType));

  return (
    <>
      {Array.from(uniqueDeviceTypes).map((type, i) => {
        switch (type) {
          case 'security-key':
            return (
              <Box key={i} className={device}>
                <SystemIcon.UsbFlashDrive />
              </Box>
            );
          case 'phone':
            return (
              <Box key={i} className={device}>
                <SystemIcon.Cookie />
              </Box>
            );
          case 'desktop':
            return (
              <Box key={i} className={device}>
                <SystemIcon.Application />
              </Box>
            );
          default:
            return (
              <Box key={i} className={device}>
                <SystemIcon.Information />
              </Box>
            );
        }
      })}
    </>
  );
}
