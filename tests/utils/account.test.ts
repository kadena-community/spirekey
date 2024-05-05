import { getAccountFrom } from '@/utils/shared/account';
import { l1Client } from '@/utils/shared/client';
import { describe, expect, it, Mock, vi } from 'vitest';
import { successResponse } from '../../__mocks__/@kadena/client';

vi.mock('@kadena/client');

describe('account', () => {
  it('returns an account when found on one chain', async () => {
    (l1Client.local as Mock).mockResolvedValue({
      ...successResponse,
      result: {
        status: 'success',
        data: [
          {
            accountName: 'c:myAccount',
            'min-approvals': { int: 1 },
            'min-registration-approvals': { int: 1 },
            devices: [{}],
          },
          0,
        ],
      },
    });

    const result = await getAccountFrom({
      accountName: 'c:myAccount',
      networkId: 'development',
      chainIds: ['0'],
    });

    expect(l1Client.local).toHaveBeenCalledWith(
      expect.objectContaining({
        cmd: expect.stringContaining('c:myAccount'),
      }),
      { preflight: false },
    );

    expect(result).toEqual({
      accountName: 'c:myAccount',
      balance: '0',
      chainIds: ['0'],
      devices: [{}],
      minApprovals: 1,
      minRegistrationApprovals: 1,
      networkId: 'development',
    });
  });

  it.only('returns an account when found on multiple chains', async () => {
    (l1Client.local as Mock).mockResolvedValueOnce({
      ...successResponse,
      result: {
        status: 'success',
        data: [
          {
            accountName: 'c:myAccount',
            'min-approvals': { int: 2 },
            'min-registration-approvals': { int: 2 },
            devices: [
              {
                'credential-id': 'credentialid1',
              },
            ],
          },
          0,
        ],
      },
    });

    (l1Client.local as Mock).mockResolvedValue({
      ...successResponse,
      result: {
        status: 'success',
        data: [
          {
            accountName: 'c:myAccount',
            'min-approvals': { int: 1 },
            'min-registration-approvals': { int: 1 },
            devices: [
              {
                'credential-id': 'credentialid1',
              },
            ],
          },
          0,
        ],
      },
    });

    const result = await getAccountFrom({
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
      balance: '0',
      chainIds: ['0', '1', '2', '3'],
      devices: [{}],
      minApprovals: 2,
      minRegistrationApprovals: 2,
      networkId: 'development',
    });
  });
});
