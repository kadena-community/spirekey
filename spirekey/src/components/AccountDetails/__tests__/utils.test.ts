import { createExplorerLink, mapNetworkIdToExplorerName } from '../utils';

describe('AccountDetails utils', () => {
  describe('mapNetworkIdToExplorerName', () => {
    it('should map the correct networkIDs to the networkNames', () => {
      expect(mapNetworkIdToExplorerName('testnet04')).toEqual('testnet');
      expect(mapNetworkIdToExplorerName('mainnet01')).toEqual('mainnet');
    });

    it('should return the networkId, if the ID can not be mapped', () => {
      expect(mapNetworkIdToExplorerName('he-man')).toEqual('he-man');
    });
  });

  describe('createExplorerLink', () => {
    it('should return the correct explorer links', () => {
      const tx = {
        requestKey: 'REQQUESTKEY',
      };
      expect(createExplorerLink(tx, 'mainnet01')).toEqual(
        'https://explorer.kadena.io/mainnet/transaction/REQQUESTKEY',
      );
    });

    it('should return the default explorer link, when requestkey is undefined', () => {
      expect(createExplorerLink(undefined, 'testnet04')).toEqual(
        'https://explorer.kadena.io/testnet',
      );
    });
  });
});
