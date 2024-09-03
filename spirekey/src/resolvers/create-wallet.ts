import { getRootkeyPasskeyName } from '@/utils/getNetworkDisplayName';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { gql, useMutation } from '@apollo/client';
import {
  kadenaDecrypt,
  kadenaEncrypt,
  kadenaGenKeypairFromSeed,
} from '@kadena/hd-wallet';
import { ChainId } from '@kadena/types';

type WalletsVariable = {
  networkId: string;
  chainId: ChainId;
};
const getCreateWalletMutation = gql`
  mutation CreateWallet($networkId: String!, $chainId: String!) {
    createWallet(networkId: $networkId, chainId: $chainId) @client
  }
`;
export const useWallet = () => {
  const [mutate] = useMutation(getCreateWalletMutation);
  const createWallet = async (networkId: string, chainId: string) => {
    const { data } = await mutate({
      variables: {
        networkId,
        chainId,
      },
    });
    if (!data?.createWallet) throw new Error('Could not create wallet');
    return data.createWallet;
  };
  return { createWallet };
};
export const createWallet = async (
  _: any,
  { networkId, chainId }: WalletsVariable,
) => {
  const { credentialId, hex } = await getNewWebauthnKey(
    getRootkeyPasskeyName(networkId!),
  );
  const tempPassword = crypto.getRandomValues(new Uint16Array(32));
  const [pubKey, privateKey] = await kadenaGenKeypairFromSeed(
    tempPassword,
    await kadenaEncrypt(
      tempPassword,
      await crypto.subtle.digest('sha-512', Buffer.from(hex)),
    ),
    0,
  );

  await registerCredentialOnChain({
    networkId: networkId!,
    chainId: chainId!,
    credentialId,
    pubkey: pubKey,
    domain: window.location.hostname,
  });
  localStorage.setItem(`${networkId}:wallet:cid`, credentialId);
  const decrypted = await kadenaDecrypt(tempPassword, privateKey);
  return {
    publicKey: pubKey,
    secretKey: Buffer.from(decrypted).toString('hex'),
  };
};

const registerCredentialOnChain = async ({
  domain,
  pubkey,
  credentialId,
  chainId,
  networkId,
}: {
  domain: string;
  pubkey: string;
  credentialId: string;
  chainId: ChainId;
  networkId: string;
}) => {
  const tx = createTransactionBuilder()
    .execution(
      `(${process.env.NAMESPACE}.spirekey.register-credential "${credentialId}" "${pubkey}" "${domain}")`,
    )
    .setMeta({ chainId, senderAccount: gasStation, gasLimit: 1800 })
    .setNetworkId(networkId)
    .addSigner(genesisPubKey, (withCap) => [
      withCap(
        `${process.env.NAMESPACE}.spirekey.GAS_PAYER`,
        gasStation,
        { int: 1 },
        1,
      ),
    ])
    .createTransaction();
  const signedTx = addSignatures(
    tx,
    sign(tx.cmd, {
      publicKey: genesisPubKey,
      secretKey: genesisPrivateKey,
    }) as { sig: string },
  );
  return await l1Client.submit(signedTx as ICommand);
};
