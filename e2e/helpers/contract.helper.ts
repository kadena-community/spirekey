import type { ChainId } from '@kadena/client';
import { Pact } from '@kadena/client';
import { isModuleDeployed } from './callLocal';

export async function isContractDeployed(
  module: string,
  apiHost: string,
  chain: number | string,
  network: string,
): Promise<boolean> {
  const command = Pact.builder
    .execution(`(describe-module "${module}")`)
    .setNetworkId(network)
    .setMeta({ chainId: chain.toString() as ChainId })
    .createTransaction();

  return await isModuleDeployed(apiHost, JSON.stringify(command));
}
