import { deliveryTranslations } from '@/app/(examples)/v1/example/delivery/utils/getDeliveryTranslations';
import devWorld from '@/assets/images/devworld.png';
import transfer from '@/components/icons/mono_credit_score.svg';
import gas from '@/components/icons/mono_local_gas_station.svg';

const webauthnWalletTranslations = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.TRANSFER': {
    title: 'Transfer via WebAuthn',
    value:
      'You are about to transfer {2} KDA to {1}, this will go through `coin`',
    image: transfer.src,
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER': {
    title: 'Pay gas via WebAuthn',
    value: 'You are about to pay for gas',
    image: gas.src,
  },
};

const coinTranslations = {
  'coin.TRANSFER': {
    title: 'Transfer KDA',
    value: 'You are about to transfer {2} KDA to {1}',
    image: transfer.src,
  },
};

const proofOfUsTranslations = {
  'n_31cd1d224d06ca2b327f1b03f06763e305099250.proof-of-us.ATTEND': {
    title: 'DevWorld',
    value: 'Your proof of attendance',
    image: devWorld.src,
  },
  'n_31cd1d224d06ca2b327f1b03f06763e305099250.proof-of-us.CONNECT': {
    title: 'DevWorld',
    value: 'Your proof of connection',
    image: devWorld.src,
  },
  'n_31cd1d224d06ca2b327f1b03f06763e305099250.proof-of-us-gas-station.GAS_PAYER':
    {
      title: 'The gas has been payed for',
      value: 'This transaction has been payed for',
      image: gas.src,
    },
};

export const getTranslations = (customBundle = {}) => {
  return {
    ...deliveryTranslations,
    ...coinTranslations,
    ...webauthnWalletTranslations,
    ...proofOfUsTranslations,
    ...customBundle,
  };
};
