import { DeployConfiguration, resolveConfiguration } from '@/utils/deploy';
import assert from 'node:assert';
import { describe, it } from 'node:test';

describe('deploy', () => {
  it('should resolve configuration', async () => {
    const config: DeployConfiguration = {
      profiles: {
        dev: {
          host: 'http://localhost:8080',
          networkId: 'testnet',
          chains: ['8', '14'],
        },
      },
      signers: {
        alice: {
          publicKey: 'some-public-key',
          secretKey: 'some-secret-key',
        },
      },
      steps: [
        {
          profile: 'dev',
          data: { name: 'token' },
          sender: 'alice',
          codeFile: './tests/utils/deploy.mock.pact',
        },
      ],
    };
    const resolvedConfig = await resolveConfiguration(config);
    assert.equal(
      resolvedConfig.steps[0].code,
      '(coin.details "some-id")\n',
      'code should be resolved',
    );
  });
});
