import desktop from '@/components/icons/desktop.svg';
import phone from '@/components/icons/phone.svg';
import securityKey from '@/components/icons/security-key.svg';

export const getDeviceIconSrc = (deviceType: string): string => {
  switch (deviceType) {
    case 'security-key':
      return securityKey.src;
    case 'desktop':
      return desktop.src;
    case 'phone':
    default:
      return phone.src;
  }
};
