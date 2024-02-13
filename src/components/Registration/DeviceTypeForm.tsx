import { SurfaceCard } from "../SurfaceCard/SurfaceCard";
import { DeviceDesktop } from '@/components/icons/DeviceDesktop';
import { DevicePhone } from '@/components/icons/DevicePhone';
import { DeviceSecurityKey } from '@/components/icons/DeviceSecurityKey';
import { descriptionEmphasis, item, itemContainer } from "./steps.css";
import { FormData, FormMethods } from "./Registration";
import { Text } from "@kadena/react-ui";

type Props = Pick<FormData, 'deviceType'> & FormMethods;

const deviceTypes: Record<string, string> = {
  'security-key': 'Security Key',
  phone: 'Phone',
  desktop: 'Desktop',
};

const getDescription = (deviceType: string) => {
  return (
    <Text>
      <Text className={descriptionEmphasis}>
        {deviceTypes[deviceType]}
      </Text>{' '}
      selected as device type.
    </Text>
  );
};

export function DeviceTypeForm({deviceType, updateFields}: Props) {
  return (
    <SurfaceCard title="Device Type" description={getDescription(deviceType)}>
      <div className={itemContainer}>
        <div>
          <input
            type="radio"
            name="deviceType"
            value="security-key"
            id="deviceType-security-key"
            checked={deviceType === 'security-key'}
            onChange={event => updateFields({deviceType: event.target.value})}
          />
          <label htmlFor="deviceType-security-key" className={item}>
            <DeviceSecurityKey />
          </label>
        </div>

        <input
          type="radio"
          name="deviceType"
          value="phone"
          id="deviceType-phone"
          checked={deviceType === 'phone'}
          onChange={event => updateFields({deviceType: event.target.value})}
        />
        <label htmlFor="deviceType-phone" className={item}>
          <DevicePhone />
        </label>

        <input
          type="radio"
          name="deviceType"
          value="desktop"
          id="deviceType-desktop"
          checked={deviceType === 'desktop'}
          onChange={event => updateFields({deviceType: event.target.value})}
        />
        <label htmlFor="deviceType-desktop" className={item}>
          <DeviceDesktop />
        </label>
      </div>
    </SurfaceCard>
  )
}
