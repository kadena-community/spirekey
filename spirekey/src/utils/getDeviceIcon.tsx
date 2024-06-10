import { DeviceDesktop } from '@/components/icons/DeviceDesktop';
import { DevicePhone } from '@/components/icons/DevicePhone';
import { DeviceSecurityKey } from '@/components/icons/DeviceSecurityKey';
import { ReactNode } from 'react';

export const getDeviceIcon = (deviceType: string): ReactNode => {
  console.log(deviceType);
  switch (deviceType) {
    case 'security-key':
      return <DeviceSecurityKey />;
    case 'phone':
      return <DevicePhone />;
    case 'desktop':
      return <DeviceDesktop />;
    default:
      return null;
  }
};
