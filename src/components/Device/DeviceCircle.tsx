import { Device } from '@/context/AccountsContext';
import { getDeviceIcon } from '@/utils/getDeviceIcon';
import { Box } from '@kadena/react-ui';
import * as styles from './DeviceCircle.css';

interface Props {
  device: Device;
}
export default function DeviceCircle({ device }: Props) {
  return (
    <Box className={styles.device} style={{ backgroundColor: device.color }}>
      {getDeviceIcon(device.deviceType)}
    </Box>
  );
}
