import pizza from '@/app/v1/example/delivery/pizza.webp';

const deliveryTranslations = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE': {
    granter: {
      title: 'Create Order Line',
      value: 'You are preparing {1} from {2} for {4} KDA',
      image: pizza,
    },
    acceptor: {
      title: 'Create Order Line',
      value: 'You are ordering {1} from {2} for {4} KDA',
      image: pizza,
    },
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SET_READY_FOR_DELIVERY':
    {
      title: 'Ready for delivery',
      value:
        'Let the customer and couriers know the order is ready for delivery',
      image: pizza,
    },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PICKUP_DELIVERY': {
    granter: {
      title: 'Pick up delivery',
      value: 'You are handing off the package to the courier',
      image: pizza,
    },
    acceptor: {
      title: 'Pick up delivery',
      value: 'You are picking up the package',
      image: pizza,
    },
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.DELIVER_ORDER': {
    granter: {
      title: 'Delivering order',
      value: 'You are handing off the order to the customer',
      image: pizza,
    },
    acceptor: {
      title: 'Delivering order',
      value: 'You are receiving the order from the courier',
      image: pizza,
    },
  },
};

const webauthnWalletTranslations = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.TRANSFER': {
    title: 'Transfer via WebAuthn',
    value:
      'You are about to transfer {2} KDA to {1}, this will go through `coin`',
    image: pizza,
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER': {
    title: 'Pay gas via WebAuthn',
    value: 'You are about to pay for gas',
    image: pizza,
  },
};

const coinTranslations = {
  'coin.TRANSFER': {
    title: 'Transfer KDA',
    value: 'You are about to transfer {2} KDA to {1}',
    image: pizza,
  },
};

export const getTranslations = () => {
  return {
    ...deliveryTranslations,
    ...coinTranslations,
    ...webauthnWalletTranslations,
  };
};
