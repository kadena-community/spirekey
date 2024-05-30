import { Capability } from '@/components/Capability/Capability';
import { useAccounts } from '@/context/AccountsContext';
import { getTranslations } from '@/utils/shared/getTranslationBundle';
import { getSmartContractMeta } from '@/utils/shared/smartContractMeta';
import { ICap, ISigner } from '@kadena/types';

interface Props {
  signers: ISigner[];
  account: any;
  order: any;
}

export function Order({ signers, account, order }: Props) {
  const { accounts } = useAccounts();

  if (!account) return null;

  const pubkeysForTx = account.credentials.flatMap(
    (credential: any) => credential.publicKey,
  );

  const merchantCaps = signers
    .filter((signer: { pubKey: string }) =>
      pubkeysForTx.includes(signer.pubKey),
    )
    .map((signer) => ({
      signer,
      account: accounts.find((account) =>
        account.devices.some((device) =>
          device.guard.keys.includes(signer.pubKey),
        ),
      ),
    }))
    .filter((signer) => !!signer.account && !!signer.signer)
    .map(({ signer, account }) => {
      const capabilities = signer.clist?.filter((capability: ICap) =>
        capability.name.includes('SELL_ORDER_ITEM'),
      );
      return {
        signer,
        account,
        capabilities,
      };
    });

  return (
    <>
      {merchantCaps.flatMap(
        (m) =>
          m.capabilities?.map((c) => (
            <Capability
              key={c.name + c.args.join(',')}
              capability={c}
              metaData={getSmartContractMeta()}
              translations={getTranslations(order.customTranslations || {})}
              type="granter"
            />
          )) || [],
      )}
    </>
  );
}
