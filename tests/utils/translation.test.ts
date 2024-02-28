import { getSmartContractMeta } from '@/utils/smartContractMeta';
import { getCustomTranslation, getTranslation } from '@/utils/translation';
import assert from 'node:assert';
import { describe, it } from 'node:test';

const translationMock = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE': {
    granter: {
      title: 'Create Order Line',
      value: 'You are preparing {1} from {2} for {4} KDA',
      image: 'http://example.pizza.com',
    },
    acceptor: {
      title: 'Create Order Line',
      value: 'You are ordering {1} from {2} for {4} KDA',
      image: 'http://example.pizza.com',
    },
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SET_READY_FOR_DELIVERY':
    {
      title: 'Ready for delivery',
      value:
        'Let the customer and couriers know the order is ready for delivery',
      image: 'http://example.pizza.com',
    },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PICKUP_DELIVERY': {
    granter: {
      title: 'Pick up delivery',
      value: 'You are handing off the package to the courier',
      image: 'http://example.pizza.com',
    },
    acceptor: {
      title: 'Pick up delivery',
      value: 'You are picking up the package',
      image: 'http://example.pizza.com',
    },
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.DELIVER_ORDER': {
    granter: {
      title: 'Delivering order',
      value: 'You are handing off the order to the customer',
      image: 'http://example.pizza.com',
    },
    acceptor: {
      title: 'Delivering order',
      value: 'You are receiving the order from the courier',
      image: 'http://example.pizza.com',
    },
  },
  'coin.TRANSFER': {
    title: 'Transfer KDA',
    value: 'You are about to transfer {2} KDA to {1}',
    image: 'http://example.pizza.com',
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.TRANSFER': {
    title: 'Transfer via WebAuthn',
    value:
      'You are about to transfer {2} KDA to {1}, this will go through `coin`',
    image: 'http://example.pizza.com',
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER': {
    title: 'Pay gas via WebAuthn',
    value: 'You are about to pay for gas',
    image: 'http://example.pizza.com',
  },
};

describe('translation', () => {
  describe('when plugging translations with capability args', () => {
    describe('coin.TRANSFER', () => {
      it('should show `You are about to transfer 5.0 KDA to c:abc`', () => {
        const capability = {
          name: 'coin.TRANSFER',
          args: ['c:abc', 'c:zxy', { decimal: '5.005' }],
        };
        assert.equal(
          getTranslation(translationMock, capability, 'granter')?.value,
          `You are about to transfer 5.005 KDA to c:zxy`,
          'Expect the values to be placed correctly in the template string',
        );
      });
    });
    describe('n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE', () => {
      describe('consent for a customer', () => {
        it('should show `You are ordering a Pizza Margherita from c:abc for 5.5 KDA`', () => {
          const capability = {
            name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE',
            args: [
              'order-id',
              'a Pizza Margherita',
              'c:zxy',
              'c:abc',
              { decimal: '5.5' },
            ],
          };
          assert.equal(
            getTranslation(translationMock, capability, 'acceptor')?.value,
            `You are ordering a Pizza Margherita from c:zxy for 5.5 KDA`,
            'It should plug and fallback to default translation when no customization is provided',
          );
        });
      });
      describe('consent for a merchant', () => {
        it('should show `You are preparing a Pizza margarhita for c:zxy for 5.5 KDA`', () => {
          const capability = {
            name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE',
            args: [
              'order-id',
              'a Pizza Margherita',
              'c:zxy',
              'c:abc',
              { decimal: '5.5' },
            ],
          };
          assert.equal(
            getTranslation(translationMock, capability, 'granter')?.value,
            `You are preparing a Pizza Margherita from c:zxy for 5.5 KDA`,
            'It should plug and fallback to default translation when no customization is provided',
          );
        });
      });
    });
  });
  describe('when customizing translations', () => {
    describe('when customizing translations for n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE', () => {
      it('should show `For 5KDA you are receiving a Pizza Margherita`', () => {
        const capability = {
          name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE',
          args: [
            'order-id',
            'DtOzsHEctJWrc4h5ne5k09n6CnIc80J4S0KjHSbz5P8',
            'c:zxy',
            'c:abc',
            { decimal: '5.5' },
          ],
        };
        const customBundle = {
          'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE("order-id","c:zxy","c:abc",{"decimal":"5.5"})':
            {
              granter: {
                title: 'Create Order Line',
                value: 'For {4}KDA you are making a Pizza Margherita',
                image: 'http://example.pizza.com',
              },
              acceptor: {
                title: 'Create Order Line',
                value: 'For {4}KDA you are receiving a Pizza Margherita',
                image: 'http://example.pizza.com',
              },
            },
        };
        assert.equal(
          getCustomTranslation({
            bundle: { ...translationMock, ...customBundle },
            capability,
            metas: getSmartContractMeta(),
            type: 'granter',
          })?.value,
          'For 5.5KDA you are making a Pizza Margherita',
          'Should retrieve the custom translation with plugs',
        );
      });
    });
  });
});
