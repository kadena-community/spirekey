export const useWallet = () => {
  const getWallet = (networkId: string) =>
    localStorage.getItem(`${networkId}:wallet:cid`);
  const setWallet = (networkId: string, cid: string) =>
    localStorage.setItem(`${networkId}:wallet:cid`, cid);
  return { getWallet, setWallet };
};
