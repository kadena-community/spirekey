import { Heading, Stack, SystemIcon } from '@kadena/react-ui';
import {
  accountAlias, plusIconContainer,
} from './Card.css';
import Card from './Card';

export default function AddDeviceCard() {
  return (
    <Card
      balancePercentage={0}
      title={
        <Heading as="h3" variant="h4" className={accountAlias}>
          Add Device
        </Heading>
      }
      center={
        <Stack justifyContent="center" className={plusIconContainer}>
          <SystemIcon.Plus size='xl' />
        </Stack>
      }
    />
  );
}
