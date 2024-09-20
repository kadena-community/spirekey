import { DeviceDesktop } from '@/components/icons/DeviceDesktop';
import { DevicePhone } from '@/components/icons/DevicePhone';
import { DeviceSecurityKey } from '@/components/icons/DeviceSecurityKey';
import { ReactNode } from 'react';

export const getDeviceIcon = (deviceType: string, aaguid: any): ReactNode => {
  if (aaguid)
    return (
      <img src={aaguid.icon_dark} alt={aaguid.name} width={40} height={40} />
    );
  switch (deviceType) {
    case 'security-key':
      return <DeviceSecurityKey />;
    case 'phone':
      return <DevicePhone />;
    case 'desktop':
      return <DeviceDesktop />;
    default:
      return <DeviceDesktop />;
  }
};
