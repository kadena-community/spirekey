import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';

import {
  filterAcceptorCapabilities,
  filterGranterCapabilities,
  getSmartContractMeta,
} from '@/utils/shared/smartContractMeta';
import { ICap } from '@kadena/types';

describe('smartContractMeta', () => {
  describe('filtering', () => {
    describe('when filtering for capabilities an account would be granting', () => {
      describe('should return the capabilities that are granting', () => {
        const capabilities: ICap[] = [
          {
            name: 'coin.TRANSFER',
            args: ['customer', 'escrow', { decimal: '2.2' }],
          },
          {
            name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE',
            args: [
              'order-id',
              'hash-of-data',
              'merchant',
              'customer',
              { decimal: '2.2' },
            ],
          },
          {
            name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE',
            args: [
              'order-id',
              'hash-of-data-2',
              'merchant',
              'customer',
              { decimal: '2.2' },
            ],
          },
          {
            name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.TRANSFER',
            args: ['customer', 'escrow', { decimal: '2.2' }],
          },
          {
            name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER',
            args: ['customer', { int: '2' }, { decimal: '2.2' }],
          },
        ];
        it('should return the capabilities that are granting', () => {
          assert.deepStrictEqual(
            capabilities.filter(
              filterGranterCapabilities({
                account: { accountName: 'customer' },
                meta: getSmartContractMeta(),
              }),
            ),
            [
              {
                name: 'coin.TRANSFER',
                args: ['customer', 'escrow', { decimal: '2.2' }],
              },
              {
                name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.TRANSFER',
                args: ['customer', 'escrow', { decimal: '2.2' }],
              },
              {
                name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.webauthn-wallet.GAS_PAYER',
                args: ['customer', { int: '2' }, { decimal: '2.2' }],
              },
            ],
            'Only Granter Capabilities should be found',
          );
        });
        it('should return the capabilities that are accepting', () => {
          assert.deepStrictEqual(
            capabilities.filter(
              filterAcceptorCapabilities({
                account: { accountName: 'customer' },
                meta: getSmartContractMeta(),
              }),
            ),
            [
              {
                name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE',
                args: [
                  'order-id',
                  'hash-of-data',
                  'merchant',
                  'customer',
                  { decimal: '2.2' },
                ],
              },
              {
                name: 'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.CREATE_ORDER_LINE',
                args: [
                  'order-id',
                  'hash-of-data-2',
                  'merchant',
                  'customer',
                  { decimal: '2.2' },
                ],
              },
            ],
            'Only Acceptor capabilities should be found',
          );
        });
      });
    });
  });
});
