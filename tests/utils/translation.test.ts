import { getTranslation, getTranslations } from '@/utils/translation';
import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';

describe('translation', () => {
  describe('when plugging translations with capability args', () => {
    describe('coin.TRANSFER', () => {
      it('should show `You are about to transfer 5.0 KDA to c:abc`', () => {
        const capability = {
          name: 'coin.TRANSFER',
          args: ['c:abc', 'c:zxy', { decimal: '5.005' }],
        };
        assert.equal(
          getTranslation(getTranslations(), capability)?.value,
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
            getTranslation(getTranslations(), capability, 'acceptor')?.value,
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
            getTranslation(getTranslations(), capability, 'granter')?.value,
            `You are preparing a Pizza Margherita from c:zxy for 5.5 KDA`,
            'It should plug and fallback to default translation when no customization is provided',
          );
        });
      });
    });
  });
  describe('when customizing translations', () => {
    describe('when customizing translations for n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE', () => {
      it('should show `For 5KDA you are receiving a Pizza Margherita`', () => {});
    });
  });
});
