import Fingerprint from '@/components/icons/Fingerprint/Fingerprint';
import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { Stack, Text } from '@kadena/react-ui';

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
    <SurfaceCard
      title="Passkey"
      description={
        isInProgress
          ? 'Your account is being created'
          : 'Create your account with a Passkey'
      }
      onClick={onClick}
      onTouchStart={onClick}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="xs"
      >
        <Fingerprint animating={isInProgress} success={isSuccessful} />

        <Text variant="ui">Tap to continue</Text>
      </Stack>
    </SurfaceCard>
  );
}
