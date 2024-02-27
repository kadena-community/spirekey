import { ICap } from '@kadena/types';

const deliveryTranslations = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE': {
    granter: {
      value: 'You are preparing {1} from {2} for {4} KDA',
      image: 'https://example.com/create-order-line.jpg',
    },
    acceptor: {
      value: 'You are ordering {1} from {2} for {4} KDA',
      image: 'https://example.com/create-order-line.jpg',
    },
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SET_READY_FOR_DELIVERY':
    {
      value:
        'Let the customer and couriers know the order is ready for delivery',
      image: 'https://example.com/ready-for-delivery.jpg',
    },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PICKUP_DELIVERY': {
    value: 'The courier picks up the order',
    image: 'https://example.com/pickup-delivery.jpg',
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.DELIVER_ORDER': {
    granter: {
      value: 'You are handing off the order to the customer',
      image: 'https://example.com/deliver-order.jpg',
    },
    acceptor: {
      value: 'You are receiving the order from the courier',
      image: 'https://example.com/deliver-order.jpg',
    },
  },
};

const webauthnWalletTranslations = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.TRANSFER': {
    value:
      'You are about to transfer {2} KDA to {1}, this will go through `coin`',
    image: 'https://example.com/transfer.jpg',
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER': {
    value: 'You are about to pay for gas',
    image: 'https://example.com/gas-payer.jpg',
  },
};

const coinTranslations = {
  'coin.TRANSFER': {
    value: 'You are about to transfer {2} KDA to {1}',
    image: 'https://example.com/transfer.jpg',
  },
};

export const getTranslations = () => {
  return {
    ...deliveryTranslations,
    ...coinTranslations,
    ...webauthnWalletTranslations,
  };
};

const formatValue = (value: any) => {
  if (value?.decimal)
    return value.decimal.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 12,
    });
  if (value?.int) return value.int;
  return value;
};

const getValue = (value: string, capability: ICap) =>
  value.replace(/{\d}/g, (plug: string) => {
    const index = Number(plug.replace(/{|}/g, ''));
    const value = formatValue(capability.args[index]);
    if (!value)
      throw new Error(
        `Can't load translations for capability: ${capability.name}`,
      );
    return value;
  });

export const getTranslation = (
  bundle: any,
  capability: ICap,
  type: 'default' | 'granter' | 'acceptor' = 'default',
) => {
  const { value, image, granter, acceptor } = bundle[capability.name] || {};
  console.log(granter);
  if (!value && !granter && !acceptor) return null;

  if (type === 'acceptor')
    return {
      value: getValue(acceptor.value, capability),
      image,
    };
  if (type === 'granter')
    return {
      value: getValue(granter.value, capability),
      image,
    };
  return {
    value: getValue(value, capability),
    image,
  };
};
