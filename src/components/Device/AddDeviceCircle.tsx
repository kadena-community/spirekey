import { Box, SystemIcon } from '@kadena/react-ui';
import classNames from 'classnames';
import * as styles from './DeviceCircle.css';

export default function AddDeviceCircle() {
  return (
    <Box className={classNames(styles.device, styles.addDeviceCircle)}>
      <SystemIcon.Plus />
    </Box>
  );
}
