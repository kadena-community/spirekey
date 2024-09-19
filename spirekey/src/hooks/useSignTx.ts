import { genesisPrivateKey, genesisPubKey } from '@/utils/constants';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import { createTransactionBuilder, IBuilder } from '@kadena/client';
import { initSpireKey, sign } from '@kadena/spirekey-sdk';
import { useEffect } from 'react';

const addDataString = (dataString: string) => (builder: IBuilder<any>) => {
  try {
    const data = JSON.parse(dataString);
    return Object.entries(data).reduce(
      (b: IBuilder<any>, [key, value]: any) => b.addData(key, value),
      builder,
    );
  } catch (_) {
    return builder;
  }
};
const addCapabilityString = (capabilityString: string) => {
  const capsStr = capabilityString.match(/\(.*\)/g);
  if (!capsStr) return () => [];
  return (withCap: any) => {
    return capsStr.map((capStr) => {
      const [capName, ...args] = capStr.replace(/\(|\)/g, '').split(' ');
      return withCap(
        capName,
        ...args.map((a) => {
          if (/^".*"$/.test(a)) return a.replace(/^"|"$/g, '');
          if (/^\d+$/.test(a)) return { int: a };
          if (/^\d+\.\d+$/.test(a)) return { decimal: a };
          return JSON.parse(a);
        }),
      );
    });
  };
};

export const useSignTx = () => {
  useEffect(() => {
    initSpireKey({
      hostUrl: window.location.origin,
    });
  }, []);
  return { signTx };
};
const signTx = async ({
  data,
  code,
  networkId,
  accountName,
  publicKey,
  verifierName,
  verifierCapabilities,
  proof,
  capabilities,
}: {
  data: string;
  code: string;
  networkId: string;
  accountName: string;
  publicKey: string;
  verifierName: string;
  verifierCapabilities: string;
  proof: string;
  capabilities: string;
}) => {
  const addData = addDataString(data);
  const builder = createTransactionBuilder().execution(code);
  const tx = addData(builder)
    .setNetworkId(networkId)
    .setMeta({
      senderAccount: accountName,
      gasLimit: 100_000,
    })
    .addVerifier(
      { name: verifierName, proof },
      addCapabilityString(verifierCapabilities),
    )
    .addSigner(
      accountName === 'sender00'
        ? { pubKey: genesisPubKey, scheme: 'ED25519' }
        : {
            pubKey: publicKey,
            scheme: 'WebAuthn',
          },
      addCapabilityString(capabilities),
    )
    .createTransaction();

  if (accountName === 'sender00')
    return signWithKeyPair({
      publicKey: genesisPubKey,
      secretKey: genesisPrivateKey,
    })(tx);
  const {
    transactions: [signedTx],
  } = await sign([tx]);
  return signedTx;
};
