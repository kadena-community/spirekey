import fingerprint from '@/assets/images/fingerprint.svg';
import { getAccountName } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Stack } from '@kadena/react-ui';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { SurfaceCard } from '../SurfaceCard/SurfaceCard';
import { FormData, FormUtils } from './Registration';

type Props = Pick<
  FormData,
  'credentialPubkey' | 'credentialId' | 'accountName' | 'networkId' | 'alias'
> &
  FormUtils;

export function BiometricsForm({
  accountName,
  credentialId,
  credentialPubkey,
  networkId,
  alias,
  updateFields,
  onCredentialCreated,
  direction,
}: Props) {
  const xPositionMultiplier = direction === 'forward' ? 1 : -1;

  const onClick = async () => {
    const { credentialId, publicKey } = await getNewWebauthnKey(alias);
    const accountName = await getAccountName(publicKey, networkId);
    updateFields({
      accountName,
      credentialId,
      credentialPubkey: publicKey,
      usedAlias: alias,
    });
    if (onCredentialCreated) {
      onCredentialCreated();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="register-step-biometrics"
        initial={{ x: 300 * xPositionMultiplier, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300 * xPositionMultiplier, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SurfaceCard
          title="Biometrics"
          description="To secure your account we need you to confirm with your biometrics"
        >
          <Stack justifyContent="center" alignItems="center" onClick={onClick}>
            <Image src={fingerprint} alt="fingerprint icon" />
          </Stack>
          <input
            type="hidden"
            required
            name="credentialPubkey"
            value={credentialPubkey}
          />
          <input
            type="hidden"
            required
            name="credentialId"
            value={credentialId}
          />
          <input
            type="hidden"
            required
            name="accountName"
            value={accountName}
          />
        </SurfaceCard>
      </motion.div>
    </AnimatePresence>
  );
}
