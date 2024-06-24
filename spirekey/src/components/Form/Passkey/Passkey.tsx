import fingerprint from '@/assets/images/fingerprint.svg';
import Fingerprint from '@/components/icons/Fingerprint';
import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { Stack, Text } from '@kadena/react-ui';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  isInProgress: boolean;
  onClick: () => void;
}

export default function Passkey({ isInProgress, onClick }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  return (
    <>
      <SurfaceCard
        title="Passkey"
        description={
          isInProgress
            ? 'Your account is being created'
            : 'Create your account with a Passkey'
        }
        onClick={onClick}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="xs"
        >
          <Fingerprint animating={isAnimating} />

          <Text variant="ui">Tap to continue</Text>
        </Stack>
      </SurfaceCard>
      <button type="button" onClick={() => setIsAnimating(!isAnimating)}>
        Toggle animate (currently {isAnimating ? 'true' : 'false'})
      </button>
    </>
  );
}
