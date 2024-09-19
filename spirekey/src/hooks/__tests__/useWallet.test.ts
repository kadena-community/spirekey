import { useWallet } from '@/hooks/useWallet';

describe('useWallet', () => {
  it('get the wallet info', {}, async () => {
    localStorage.setItem('development:wallet:cid', 'tefnXUn');
    const { getWallet, setWallet } = useWallet();
    expect(getWallet('development')).toEqual('tefnXUn');
    setWallet('development', 'UeIuI');
    expect(getWallet('development')).toEqual('UeIuI');
    expect(getWallet('notexisting')).toEqual(null);
  });
});
