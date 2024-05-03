import { afterEach, assert, describe, expect, it, vi } from 'vitest';

import {
  DeployConfiguration,
  executeStepWith,
  resolveConfiguration,
} from '@/utils/deploy';
import { l1Client } from '@/utils/shared/client';

vi.mock('@kadena/client');

const config: DeployConfiguration = {
  profiles: {
    dev: {
      host: 'http://localhost:8080',
      networkId: 'testnet',
      chains: ['8', '14'],
    },
  },
  signers: {
    sender00: {
      publicKey:
        '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
      secretKey:
        '251a920c403ae8c8f65f59142316af3c82b631fba46ddea92ee8c95035bd2898',
    },
  },
  steps: [
    {
      profile: 'dev',
      data: { name: 'token' },
      sender: 'sender00',
      codeFile: './tests/utils/deploy.mock.pact',
    },
  ],
};

describe('deploy', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should resolve configuration', async () => {
    const resolvedConfig = await resolveConfiguration(config);
    assert.equal(
      resolvedConfig.steps[0].code,
      '(coin.details "some-id")\n',
      'code should be resolved',
    );
  });

  it('should execute the step on all defined chains', async () => {
    await executeStepWith(l1Client)(
      {
        profile: 'dev',
        data: { name: 'token' },
        sender: 'sender00',
        code: '(coin.details "some-id")\n',
      },
      config,
    );

    expect(
      l1Client.submit,
      'l1Client.submit not called for each chain',
    ).toHaveBeenCalledTimes(2);

    expect(
      l1Client.pollOne,
      'l1Client.pollOne not called for each chain',
    ).toHaveBeenCalledTimes(2);
  });
});
