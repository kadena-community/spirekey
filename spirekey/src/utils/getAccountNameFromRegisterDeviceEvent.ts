import { createTransaction } from '@kadena/client';
import {
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { ChainId } from '@kadena/types';
import { asyncPipe } from './shared/asyncPipe';
import { l1Client } from './shared/client';

interface Event {
  params: string[];
}

export const getAccountNameFromRegisterDeviceEvent = async (
  domain: string,
  credentialId: string,
): Promise<string> => {
  const events = await fetchEvents(domain, credentialId);

  if (events.length === 0) {
    throw new Error('No events found.');
  }

  try {
    return getAccountName(
      events[0].params[0],
      process.env.WALLET_NETWORK_ID || '',
    );
  } catch (_) {
    throw new Error('No transaction found for event.');
  }
};

const fetchEvents = async (
  domain: string,
  credentialId: string,
): Promise<Event[]> => {
  try {
    const eventsResponse = await fetch(
      `${domain}/txs/events?param=${credentialId}&name=REGISTER_DEVICE&modulename=${process.env.NAMESPACE}.webauthn-guard`,
    );
    return await eventsResponse.json();
  } catch (_) {
    return [];
  }
};

export const getAccountName = async (
  account: string,
  networkId: string,
): Promise<string> =>
  asyncPipe(
    composePactCommand(
      execution(
        `(${process.env.NAMESPACE}.webauthn-wallet.get-account-name "${account}")`,
      ),
      setMeta({
        chainId: process.env.CHAIN_ID as ChainId,
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) =>
      l1Client.local(tx, { preflight: false, signatureVerification: false }),
    (tx) => tx.result.data,
  )({});
