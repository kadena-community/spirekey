import { Device } from '@/context/AccountsContext';
import { getDeviceIcon } from '@/utils/getDeviceIcon';
import { Box } from '@kadena/react-ui';
import classNames from 'classnames';
import * as styles from './DeviceCircle.css';

interface Props {
  device: Device;
}
export default function DeviceCircle({ device }: Props) {
  return (
    <Box
      className={classNames(
        styles.device,
        styles.backgroundColors[device.color],
      )}
    >
      {getDeviceIcon(device.deviceType)}
    </Box>
  );
}
