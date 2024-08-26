import {
  getAccountFromChain,
  getAccountFromChains,
} from '@/utils/shared/account';
import { l1Client } from '@/utils/shared/client';
import { type ChainId } from '@kadena/client';
import { Mock, describe, expect, it, vi } from 'vitest';
import { errorResponse, successResponse } from '../../__mocks__/@kadena/client';

vi.mock('@kadena/client');

describe('account', () => {
  describe('getAccountFromChain', () => {
    it('returns null when no account is found', async () => {
      (l1Client.local as Mock).mockResolvedValue({
        ...errorResponse,
      });

      const result = await getAccountFromChain({
        accountName: 'c:myAccount',
        networkId: 'development',
        chainId: '0',
      });

      expect(result).toBeNull();
    });

    it('returns account details found on chain', async () => {
      const accountName = 'c:myAccount';
      const networkId = 'development';
      const chainId = '0';
      const devices = [{ 'credential-id': 'credentialid1' }];

      (l1Client.local as Mock).mockResolvedValue({
        ...successResponse,
        result: {
          status: 'success',
          data: [
            {
              accountName,
              'min-approvals': { int: 1 },
              'min-registration-approvals': { int: 1 },
              devices,
            },
            '13.37',
          ],
        },
      });

      const result = await getAccountFromChain({
        accountName,
        networkId,
        chainId,
      });

      expect(result).toEqual({
        accountName,
        minApprovals: 1,
        minRegistrationApprovals: 1,
        devices,
        balance: '13.37',
        chainIds: [chainId],
        networkId,
      });
    });
  });

  describe.skip('getAccountFromChains', () => {
    it('returns account details found on one chain', async () => {
      const accountName = 'c:myAccount';
      const networkId = 'development';
      const chainIds = ['0' as ChainId];
      const devices = [{ 'credential-id': 'credentialid1' }];

      (l1Client.local as Mock).mockResolvedValue({
        ...successResponse,
        result: {
          status: 'success',
          data: [
            {
              accountName,
              'min-approvals': { int: 1 },
              'min-registration-approvals': { int: 1 },
              devices,
            },
            '13.37',
          ],
        },
      });

      const result = await getAccountFromChains({
        accountName,
        networkId,
        chainIds,
      });

      expect(result).toEqual({
        accountName,
        minApprovals: 1,
        minRegistrationApprovals: 1,
        devices,
        balance: '13.37',
        chainIds,
        networkId,
        txQueue: [],
      });
    });

    it('returns account details found on only one of two requested chains', async () => {
      const accountName = 'c:myAccount';
      const networkId = 'development';
      const chainIds = ['0' as ChainId, '1' as ChainId];
      const devices = [{ 'credential-id': 'credentialid1' }];

      (l1Client.local as Mock).mockResolvedValueOnce({
        ...errorResponse,
      });

      (l1Client.local as Mock).mockResolvedValue({
        ...successResponse,
        result: {
          status: 'success',
          data: [
            {
              accountName,
              'min-approvals': { int: 1 },
              'min-registration-approvals': { int: 1 },
              devices,
            },
            '13.37',
          ],
        },
      });

      const result = await getAccountFromChains({
        accountName,
        networkId,
        chainIds,
      });

      expect(result).toEqual({
        accountName,
        minApprovals: 1,
        minRegistrationApprovals: 1,
        devices,
        balance: '13.37',
        chainIds: ['1'],
        networkId,
        txQueue: [],
      });
    });

    it('returns an account with data aggregated from multiple chains', async () => {
      (l1Client.local as Mock).mockResolvedValueOnce({
        ...errorResponse,
      });

      (l1Client.local as Mock).mockResolvedValueOnce({
        ...successResponse,
        result: {
          status: 'success',
          data: [
            {
              accountName: 'c:myAccount',
              'min-approvals': { int: 1 },
              'min-registration-approvals': { int: 2 },
              devices: [{ 'credential-id': 'credentialid1' }],
            },
            '13.37',
          ],
        },
      });

      (l1Client.local as Mock).mockResolvedValueOnce({
        ...successResponse,
        result: {
          status: 'success',
          data: [
            {
              accountName: 'c:myAccount',
              'min-approvals': { int: 4 },
              'min-registration-approvals': { int: 1 },
              devices: [{ 'credential-id': 'credentialid2' }],
            },
            '9.0001',
          ],
        },
      });

      (l1Client.local as Mock).mockResolvedValueOnce({
        ...successResponse,
        result: {
          status: 'success',
          data: [
            {
              accountName: 'c:myAccount',
              'min-approvals': { int: 3 },
              'min-registration-approvals': { int: 5 },
              devices: [{ 'credential-id': 'credentialid2' }],
            },
            '24.95',
          ],
        },
      });

      const result = await getAccountFromChains({
        accountName: 'c:myAccount',
        networkId: 'development',
        chainIds: ['0', '1', '2', '3'],
      });

      expect(l1Client.local).toHaveBeenCalledWith(
        expect.objectContaining({
          cmd: expect.stringContaining('c:myAccount'),
        }),
        { preflight: false },
      );

      expect(result).toEqual({
        accountName: 'c:myAccount',
        balance: '47.3201', // the sum of balances on all chains
        chainIds: ['1', '2', '3'], // the account was not found on chain 0
        devices: [
          { 'credential-id': 'credentialid1' }, // this device is deduplicated
          { 'credential-id': 'credentialid2' },
        ],
        minApprovals: 4, // the maximum minApprovals across chains
        minRegistrationApprovals: 5, // the maximum minRegistrationApprovals across chains
        networkId: 'development',
        txQueue: [],
      });
    });
  });
});
