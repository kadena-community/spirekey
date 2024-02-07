import { genesisPrivateKey, genesisPubKey } from '@/utils/constants';
import {
  DeployConfiguration,
  executeStepWith,
  resolveConfiguration,
} from '@/utils/deploy';
import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';

describe('deploy', () => {
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
        publicKey: genesisPubKey,
        secretKey: genesisPrivateKey,
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
  const mockClient = {
    submit: mock.fn((x) => Promise.resolve(x)),
    listen: mock.fn((x) => Promise.resolve(x)),
  };
  beforeEach(() => {
    mockClient.submit.mock.resetCalls();
    mockClient.listen.mock.resetCalls();
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
    await executeStepWith(mockClient)(
      {
        profile: 'dev',
        data: { name: 'token' },
        sender: 'sender00',
        code: '(coin.details "some-id")\n',
      },
      config,
    );
    assert.equal(
      mockClient.submit.mock.callCount(),
      2,
      'should have submitted for each chain',
    );
    assert.equal(
      mockClient.listen.mock.callCount(),
      2,
      'should have listened for each chain',
    );
  });
});
