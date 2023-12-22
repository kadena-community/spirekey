import type { Account, Device } from '@/context/AccountContext';
import { asyncPipe } from '@/utils/asyncPipe';
import { createTransaction } from '@kadena/client';
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

export const addDevice = async (
  signingDevice: Device,
  account: Account,
  device: Device,
) => {
  const result = await asyncPipe(
    composePactCommand(
      execution(
        `(${process.env.NAMESPACE}.webauthn-wallet.add-device
          "${account.name}" (read-msg 'device))`,
      ),
      addData('device', device),
      setMeta({
        senderAccount: account.name,
        gasLimit: 4000,
        chainId: '14',
        gasPrice: 0.00000001,
      }),
      setNetworkId(process.env.NETWORK_ID || 'fast-development'),
      addSigner(
        // @ts-expect-error WebAuthn is not yet added to the @kadena/client types
        {
          pubKey: signingDevice.guard.keys[0],
          scheme: 'WebAuthn',
        },
        (withCap) => [
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.ADD_DEVICE`,
            account.name,
          ),
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
            account.name,
            { int: 1 },
            1,
          ),
        ],
      ),
    ),
    createTransaction,
  )({});

  return result;
};
