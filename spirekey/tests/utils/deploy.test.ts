import { genesisPrivateKey, genesisPubKey } from '@/utils/constants';
import {
  decryptContent,
  DeployConfiguration,
  encryptContent,
  EncryptedContent,
  executeStepWith,
  getKey,
  resolveConfiguration,
} from '@/utils/deploy';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

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
    submit: vi.fn((x) => Promise.resolve(x)),
    pollOne: vi.fn((x) => Promise.resolve(x)),
  };
  beforeEach(() => {
    mockClient.submit.mockReset();
    mockClient.pollOne.mockReset();
  });
  it('should resolve configuration', async () => {
    const resolvedConfig = await resolveConfiguration(config);
    expect(resolvedConfig.steps[0].code).toEqual('(coin.details "some-id")\n');
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
    expect(mockClient.submit.mock.calls.length).toEqual(2);
    expect(mockClient.pollOne.mock.calls.length).toEqual(2);
  });
});

describe('encryption', () => {
  describe('when encrypting and decrypting files', () => {
    const original = JSON.stringify({ x: 123, y: 654 });
    const pw = 'XereYe24Ra';
    let encrypted: EncryptedContent;
    let decrypted: string;
    beforeAll(async () => {
      const key = await getKey(pw);
      encrypted = await encryptContent(original, key);
      decrypted = await decryptContent(encrypted, key);
    });
    it('should create an object with the encrypted content', () => {
      expect(encrypted.content).toBeTruthy();
    });
    it('should create an object with the iv used', () => {
      expect(encrypted.iv).toBeTruthy();
    });
    it('should decrypt to the original content', () => {
      expect(decrypted).toEqual(original);
    });
  });
});
