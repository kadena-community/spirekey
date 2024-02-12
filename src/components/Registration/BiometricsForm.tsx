import { Stack } from "@kadena/react-ui";
import { SurfaceCard } from "../SurfaceCard/SurfaceCard";
import Image from "next/image";
import fingerprint from '@/assets/images/fingerprint.svg';
import { FormData, FormMethods } from "./Registration";
import { getNewWebauthnKey } from "@/utils/webauthnKey";
import { getAccountName } from "@/utils/register";

type Props = Pick<FormData, 'credentialPubkey' | 'credentialId' | 'accountName' | 'networkId' | 'alias' | 'usedAlias'> & FormMethods;

export function BiometricsForm({accountName, credentialId, credentialPubkey, networkId, alias, usedAlias, updateFields, onCredentialCreated}: Props) {
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
  }
  return (
    <SurfaceCard
      title="Biometrics"
      description="To secure your account we need you to confirm with your biometrics"
    >
      <Stack justifyContent="center" alignItems="center" onClick={onClick}>
        <Image src={fingerprint} alt="fingerprint icon" />
      </Stack>
      <input type="hidden" required name="credentialPubkey" value={credentialPubkey} />
      <input type="hidden" required name="credentialId" value={credentialId} />
      <input type="hidden" required name="accountName" value={accountName} />
    </SurfaceCard>
  )
}