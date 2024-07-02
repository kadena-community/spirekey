import Fingerprint from '@/components/icons/Fingerprint/Fingerprint';
import { Stack } from '@kadena/react-ui';

interface Props {
  isInProgress: boolean;
  isSuccessful: boolean;
  onClick: () => void;
}

export default function Passkey({
  isInProgress,
  isSuccessful,
  onClick,
}: Props) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="xs"
    >
      <Fingerprint animating={isInProgress} success={isSuccessful} />
    </Stack>
  );
}
