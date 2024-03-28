import type { Account, Device } from '@/context/AccountsContext';
import { asyncPipe } from '@/utils/shared/asyncPipe';
import { ChainId, createTransaction } from '@kadena/client';
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

export const transactionDeviceFromDevice = (device: Device) => ({
  name: `${device.deviceType}_${device.color}`,
  domain: device.domain,
  ['credential-id']: device['credential-id'],
  guard: device.guard,
});

export const addDevice = async (
  signingDevice: Device,
  account: Account,
  device: Device,
) => {
  const d = transactionDeviceFromDevice(device);
  const result = await asyncPipe(
    composePactCommand(
      execution(
        `(${process.env.NAMESPACE}.webauthn-wallet.add-device
          "${account.accountName}" (read-msg 'device))`,
      ),
      addData('device', d),
      setMeta({
        senderAccount: account.accountName,
        gasLimit: 4000,
        chainId: process.env.CHAIN_ID as ChainId,
        gasPrice: 0.00000001,
      }),
      setNetworkId(account.networkId),
      addSigner(
        // @ts-expect-error WebAuthn is not yet added to the @kadena/client types
        {
          pubKey: signingDevice.guard.keys[0],
          scheme: 'WebAuthn',
        },
        (withCap) => [
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.ADD_DEVICE`,
            account.accountName,
          ),
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
            account.accountName,
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
