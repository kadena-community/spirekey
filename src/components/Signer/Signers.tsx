import { ISigner } from '@kadena/types';
import { Capability } from '../Capability/Capability';

interface Props {
  currentSigner: any;
  signers: ISigner[];
}

export const Signers = ({ currentSigner, signers }: Props) => {
  return signers
    .find((signer: any) => signer.pubKey === currentSigner?.guard.keys[0])
    ?.clist?.filter(
      (cap) =>
        cap.name !== `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
    )
    .map((cap) => {
      return <Capability cap={cap} />;
    });
};
