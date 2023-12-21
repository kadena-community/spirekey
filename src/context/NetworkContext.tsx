'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

const NetworkContext = createContext({
  network: '',
  chainwebDataUrl: '',
  setNetwork: (network: string) => {},
});

type Props = {
  defaultNetwork: string;
  children: ReactNode;
};

const getChainwebDataUrl = (network: string) => {
  if (network === 'mainnet01')
    throw new Error('mainnet01 is not supported yet');
  if (network === 'fast-development') return 'http://localhost:8080';
  return 'https://estats.testnet.chainweb.com';
};

const NetworkProvider = ({ defaultNetwork, children }: Props) => {
  const [network, setNetwork] = useState(
    localStorage.getItem('network') || defaultNetwork,
  );
  const [chainwebDataUrl, setChainwebDataUrl] = useState(
    getChainwebDataUrl(network),
  );

  const setNetworkById = (network: string) => {
    localStorage.setItem('network', network);
    setNetwork(network);
    setChainwebDataUrl(getChainwebDataUrl(network));
  };

  const value = {
    network,
    chainwebDataUrl,
    setNetwork: setNetworkById,
  };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

export { NetworkProvider, useNetwork };
