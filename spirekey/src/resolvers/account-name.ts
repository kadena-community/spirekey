import { getWebAuthnPubkeyFormat } from '@/utils/register';
import { l1Client } from '@/utils/shared/client';
import { gql, useLazyQuery } from '@apollo/client';
import { createTransactionBuilder } from '@kadena/client';
import { Guard } from '@kadena/spirekey-types';

type AccountNameVariable = {
  networkId: string;
  hdWalletKey: string;
  passKey: string;
};
const accountNamePactCode = `
(let* (
  (ns-name (ns.create-principal-namespace (read-keyset 'ns-keyset)))
  (ks-ref-name (format "{}.{}" [ns-name 'spirekey-keyset]))
)
  (define-namespace
    ns-name
    (read-keyset 'ns-keyset )
    (read-keyset 'ns-keyset )
  )
  (namespace ns-name)
  (define-keyset ks-ref-name
    (read-keyset 'ns-keyset)
  )
  { 'name  : (create-principal (keyset-ref-guard ks-ref-name))
  , 'guard : (keyset-ref-guard ks-ref-name)
  }
)`;
export const accountName = async (
  _: any,
  { networkId, passKey, hdWalletKey }: AccountNameVariable,
) => {
  const { name, guard } = await getAccountName(passKey, hdWalletKey, networkId);
  return { name, guard };
};
type RAccountInfo = { name: string; guard: Guard };
const getAccountName = async (
  passKey: string,
  hdWalletKey: string,
  networkId: string,
): Promise<RAccountInfo> => {
  const tx = createTransactionBuilder()
    .execution(accountNamePactCode)
    .setMeta({
      chainId: process.env.CHAIN_ID,
    })
    .addData('ns-keyset', {
      keys: [getWebAuthnPubkeyFormat(passKey), hdWalletKey],
      pred: 'keys-any',
    })
    .addSigner(hdWalletKey)
    .setNetworkId(networkId)
    .createTransaction();
  const res = await l1Client.local(tx, {
    preflight: false,
    signatureVerification: false,
  });
  if (res.result.status !== 'success')
    throw new Error('Cannot retrieve account name');
  return res.result.data as RAccountInfo;
};
const getAccountNameQuery = gql`
  query AccountName(
    $networkId: String!
    $hdWalletKey: String!
    $passKey: String!
  ) {
    accountName(
      networkId: $networkId
      hdWalletKey: $hdWalletKey
      passKey: $passKey
    ) @client
  }
`;
export const useAccountName = () => {
  const getAccountName = useLazyQuery(getAccountNameQuery);
  return {
    getAccountName,
  };
};
