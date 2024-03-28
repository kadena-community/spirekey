import { DeviceDesktop } from '@/components/icons/DeviceDesktop';
import { DevicePhone } from '@/components/icons/DevicePhone';
import { DeviceSecurityKey } from '@/components/icons/DeviceSecurityKey';
import { SystemIcon } from '@kadena/react-ui';
import { ReactNode } from 'react';

export const getDeviceIcon = (deviceType: string): ReactNode => {
  switch (deviceType) {
    case 'security-key':
      return <DeviceSecurityKey />;
    case 'phone':
      return <DevicePhone />;
    case 'desktop':
      return <DeviceDesktop />;
    default:
      return <SystemIcon.Information />;
  }
};
