import focus from '@/components/icons/mono_center_focus_strong.svg';
import transfer from '@/components/icons/mono_credit_score.svg';
import done from '@/components/icons/mono_download_done.svg';
import check from '@/components/icons/mono_fact_check.svg';
import gas from '@/components/icons/mono_local_gas_station.svg';
import add from '@/components/icons/mono_playlist_add.svg';
import deliver from '@/components/icons/mono_view_in_ar.svg';

const deliveryTranslations = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE': {
    granter: {
      title: 'Create Order Line',
      value: 'You are preparing {1} from {2} for {4} KDA',
      image: add,
    },
    acceptor: {
      title: 'Create Order Line',
      value: 'You are ordering {1} from {2} for {4} KDA',
      image: add,
    },
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SET_READY_FOR_DELIVERY':
    {
      title: 'Ready for delivery',
      value:
        'Let the customer and couriers know the order is ready for delivery',
      image: check,
    },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PICKUP_DELIVERY': {
    granter: {
      title: 'Pick up delivery',
      value: 'You are handing off the package to the courier',
      image: focus,
    },
    acceptor: {
      title: 'Pick up delivery',
      value: 'You are picking up the package',
      image: focus,
    },
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.DELIVER_ORDER': {
    granter: {
      title: 'Delivering order',
      value: 'You are handing off the order to the customer',
      image: deliver,
    },
    acceptor: {
      title: 'Delivering order',
      value: 'You are receiving the order from the courier',
      image: done,
    },
  },
};

const webauthnWalletTranslations = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.TRANSFER': {
    title: 'Transfer via WebAuthn',
    value:
      'You are about to transfer {2} KDA to {1}, this will go through `coin`',
    image: transfer,
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER': {
    title: 'Pay gas via WebAuthn',
    value: 'You are about to pay for gas',
    image: gas,
  },
};

const coinTranslations = {
  'coin.TRANSFER': {
    title: 'Transfer KDA',
    value: 'You are about to transfer {2} KDA to {1}',
    image: transfer,
  },
};

export const getTranslations = (customBundle = {}) => {
  return {
    ...deliveryTranslations,
    ...coinTranslations,
    ...webauthnWalletTranslations,
    ...customBundle,
  };
};
