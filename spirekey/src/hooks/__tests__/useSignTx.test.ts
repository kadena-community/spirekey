import { renderHook } from '@/../tests/setup';
import { genesisPubKey } from '@/utils/constants';
import { useSignTx } from '../useSignTx';

vi.mock('@kadena/spirekey-sdk', async (importOriginal) => {
  const sdk: any = await importOriginal();
  return {
    ...sdk,
    initSpireKey: vi.fn(),
  };
});
describe('useSignHook', () => {
  it('should sign for a tx with sender00', {}, async () => {
    const { result } = renderHook(() => useSignTx());
    const { signTx } = result.current;
    const { cmd } = await signTx({
      accountName: 'sender00',
      code: `(+ 1 1)`,
      data: '',
      verifierName: '',
      proof: '',
      capabilities: `(coin.TRANSFER "sender" "receiver" 10.0)`,
      networkId: 'development',
      verifierCapabilities: '',
      publicKey: '',
    });
    const { meta, payload, networkId, signers } = JSON.parse(cmd);
    expect(payload).toEqual({
      exec: {
        code: `(+ 1 1)`,
        data: {},
      },
    });
    expect(meta).toMatchObject({
      sender: 'sender00',
      gasLimit: 100_000,
    });
    expect(networkId).toEqual('development');
    expect(signers).toEqual([
      {
        pubKey: genesisPubKey,
        scheme: 'ED25519',
        clist: [
          {
            name: 'coin.TRANSFER',
            args: ['sender', 'receiver', { decimal: '10.0' }],
          },
        ],
      },
    ]);
  });
  it('should add the verifier plugin', {}, async () => {
    const { result } = renderHook(() => useSignTx());
    const { signTx } = result.current;
    const { cmd } = await signTx({
      accountName: 'sender00',
      code: `(+ 1 1)`,
      data: '',
      verifierName: 'ZK',
      proof: 'Base64stringOfMyProof',
      capabilities: `(coin.GAS)`,
      networkId: 'development',
      verifierCapabilities: `
(my.verifier.CAPABILITY "some-string" 1 1.0)
(coin.TRANSFER "sender" "receiver" 8.5)
`,
      publicKey: '',
    });
    const { meta, payload, networkId, signers, verifiers } = JSON.parse(cmd);
    expect(verifiers).toEqual([
      {
        name: 'ZK',
        proof: 'Base64stringOfMyProof',
        clist: [
          {
            name: 'my.verifier.CAPABILITY',
            args: ['some-string', { int: '1' }, { decimal: '1.0' }],
          },
          {
            name: 'coin.TRANSFER',
            args: ['sender', 'receiver', { decimal: '8.5' }],
          },
        ],
      },
    ]);
    expect(payload).toEqual({
      exec: {
        code: `(+ 1 1)`,
        data: {},
      },
    });
    expect(meta).toMatchObject({
      sender: 'sender00',
      gasLimit: 100_000,
    });
    expect(networkId).toEqual('development');
    expect(signers).toEqual([
      {
        pubKey: genesisPubKey,
        scheme: 'ED25519',
        clist: [
          {
            name: 'coin.GAS',
            args: [],
          },
        ],
      },
    ]);
  });
});
