import { SurfaceCard } from "../SurfaceCard/SurfaceCard";
import { DeviceDesktop } from '@/components/icons/DeviceDesktop';
import { DevicePhone } from '@/components/icons/DevicePhone';
import { DeviceSecurityKey } from '@/components/icons/DeviceSecurityKey';

const deviceTypes: Record<string, string> = {
  'security-key': 'Security Key',
  phone: 'Phone',
  desktop: 'Desktop',
};

export function DeviceTypeForm() {
  return (
    <SurfaceCard title="Device Type" description={getDescription()}>
      <div className={itemContainer}>
        <div>
          <input
            {...register('deviceType')}
            type="radio"
            value="security-key"
            id="deviceType-security-key"
          />
          <label htmlFor="deviceType-security-key" className={item}>
            <DeviceSecurityKey />
          </label>
        </div>

        <input
          {...register('deviceType')}
          type="radio"
          value="phone"
          id="deviceType-phone"
        />
        <label htmlFor="deviceType-phone" className={item}>
          <DevicePhone />
        </label>

        <input
          {...register('deviceType')}
          type="radio"
          value="desktop"
          id="deviceType-desktop"
        />
        <label htmlFor="deviceType-desktop" className={item}>
          <DeviceDesktop />
        </label>
      </div>
    </SurfaceCard>
  )
}