import { genesisAccount, genesisPubKey } from '@/utils/constants';
import { IContinuationPayloadObject } from '@kadena/client';
import {
  addKeyset,
  addSigner,
  composePactCommand,
  continuation,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { getDevnetNetworkId } from './getDevnetNetworkId';

export function createL2ContinuationCommand(
  options: IContinuationPayloadObject['cont'],
  signerPubKey: string,
) {
  return composePactCommand(
    continuation(options),
    setMeta({
      chainId: '2',
      gasLimit: 1000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: genesisAccount,
    }),
    addSigner(genesisPubKey, (withCapabilities) => [
      withCapabilities('coin.GAS'),
      withCapabilities(`${process.env.NAMESPACE}.l2.GOVERNANCE`),
    ]),
    setNetworkId(process.env.DAPP_NETWORK_ID!),
  )();
}
