import { getSmartContractMeta } from '@/utils/shared/smartContractMeta';
import { getCustomTranslation, getTranslation } from '@/utils/translation';
import assert from 'node:assert';
import { describe, it } from 'vitest';

const translationMock = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PURCHASE_ORDER_ITEM': {
    title: 'Purchase order item',
    value: 'You are purchasing {1} for {2} KDA',
    image: 'http://example.pizza.com',
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SET_READY_FOR_DELIVERY':
    {
      title: 'Ready for delivery',
      value:
        'Let the customer and couriers know the order is ready for delivery',
      image: 'http://example.pizza.com',
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

// TODO: Remove all 'granter' and 'acceptor' references
describe('translation', () => {
  describe('when the translation has no args', () => {
    it('should show `You are about to pay for gas`', () => {
      const capability = {
        name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SET_READY_FOR_DELIVERY',
        args: ['order-id'],
      };
      assert.equal(
        getTranslation(translationMock, capability, 'granter')?.value,
        'Let the customer and couriers know the order is ready for delivery',
        'Expect the default translation to be shown',
      );
    });
  });
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
    describe('consent for a buyer', () => {
      it('should show `You are purchasing a pizza for c:zxy for 5.5 KDA`', () => {
        const capability = {
          name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PURCHASE_ORDER_ITEM',
          args: ['order-id', 'a pizza', { decimal: '5.5' }],
        };
        assert.equal(
          getTranslation(translationMock, capability, 'granter')?.value,
          `You are purchasing a pizza for 5.5 KDA`,
          'It should plug and fallback to default translation when no customization is provided',
        );
      });
    });
  });
});
describe('when customizing translations', () => {
  describe('when customizing translations for n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PURCHASE_ORDER_ITEM', () => {
    it('You are ordering a pizza for 5.5KDA`', () => {
      const capability = {
        name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PURCHASE_ORDER_ITEM',
        args: ['order-id', 'a pizza', { decimal: '5.5' }],
      };
      const customBundle = {
        'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PURCHASE_ORDER_ITEM("order-id","a pizza",{"decimal":"5.5"})':
          {
            title: 'Create Order Line',
            value: 'You are ordering a CUSTOM pizza for {2}KDA',
            image: 'http://example.pizza.com',
          },
      };
      assert.equal(
        getCustomTranslation({
          bundle: { ...translationMock, ...customBundle },
          capability,
          metas: getSmartContractMeta(),
          type: 'granter',
        })?.value,
        'You are ordering a CUSTOM pizza for 5.5KDA',
        'Should retrieve the custom translation with plugs',
      );
    });
  });
});
