import aaguidMap from '@/utils/aaguid.json' with { type: 'json' };
import { getDeviceIcon } from '@/utils/getDeviceIcon';
import { Stack, Text } from '@kadena/kode-ui';
import type { Account, Device } from '@kadena/spirekey-types';
import * as styles from './Card.css';

type DeviceIconsProps = {
  account: Account;
  device?: Device;
  showSingleIcon?: boolean;
  prependTitle?: boolean;
  appendTitle?: boolean;
};

const getAaguid = (map: any, key: string) => {
  return map[key];
};

export default function DeviceIcons({
  account,
  device,
  showSingleIcon = false,
  prependTitle = false,
  appendTitle = false,
}: DeviceIconsProps) {
  const firstDevice = account.devices[0];
  const uniqueDeviceTypes = new Set<string>([
    device?.deviceType || firstDevice.deviceType,
  ]);

  // Display all unique device types on the first card
  if (
    !showSingleIcon &&
    (!device || firstDevice['credential-id'] === device['credential-id'])
  ) {
    account.devices.map((d) => uniqueDeviceTypes.add(d.deviceType));
  }

  return Array.from(uniqueDeviceTypes).map((type, i) => {
    const aaguid = getAaguid(aaguidMap, type);
    const icon = getDeviceIcon(type, aaguid);
    console.log(aaguid);
    return (
      <Stack key={i} className={styles.device} alignItems="center" gap="sm">
        {prependTitle && <Text variant="code">{aaguid.name}</Text>}
        {icon}
        {appendTitle && !prependTitle && (
          <Text variant="code">{aaguid.name}</Text>
        )}
      </Stack>
    );
  });
}
