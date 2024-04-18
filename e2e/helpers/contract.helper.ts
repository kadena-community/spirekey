import type { ChainId } from '@kadena/client';
import { Pact } from '@kadena/client';
import { fetchModule } from './callLocal';

export async function isContractDeployed(
  module: string,
  apiHost: string,
  chain: number | string,
  network: string,
): Promise<Boolean> {
  const command = Pact.builder
    .execution(`(describe-module "${module}")`)
    .setNetworkId(network)
    .setMeta({ chainId: chain.toString() as ChainId })
    .createTransaction();

  const { code, error } = await fetchModule(apiHost, JSON.stringify(command));

  if (error !== undefined) {
    return false;
  } else if (code !== undefined) {
    return true;
  } else {
    return false;
  }
}
