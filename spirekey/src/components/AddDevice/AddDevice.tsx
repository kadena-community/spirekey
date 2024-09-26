import { Permissions } from '@/components/Permissions/Permissions';
import { useAccount, useAccounts } from '@/resolvers/accounts';
import { useAddDevice } from '@/resolvers/add-device';
import { useAutoTransfers } from '@/resolvers/auto-transfers';
import { useSignSubmitHd } from '@/resolvers/sign-hd';
import { Button, Stack } from '@kadena/kode-ui';
import { CardContentBlock, CardFooterGroup } from '@kadena/kode-ui/patterns';
import { ChainId } from '@kadena/types';
import { useState } from 'react';

export const AddDevice = ({ accountName }: { accountName?: string }) => {
  const { accounts, loading } = useAccounts();
  const { setAccount } = useAccount();
  const { getAddDeviceTxs } = useAddDevice();
  const [txs, setTxs] = useState();
  const [autoTxs, setAutoTxs] = useState();
  const account = accounts?.find((a) => a.accountName === accountName);
  const { signSubmitHd, isSubmitting } = useSignSubmitHd();
  const { getAutoTransfers } = useAutoTransfers();
  if (!account) return null;
  return (
    <>
      <CardContentBlock title="Add Device">
        <CardFooterGroup>
          <Button
            onPress={async () => {
              setAutoTxs(
                await getAutoTransfers(
                  account.networkId,
                  account.accountName,
                  Array(20)
                    .fill(1)
                    .map((_, i) => ({
                      amount: 0.1,
                      fungible: 'coin',
                      target: i.toString() as ChainId,
                    })),
                ),
              );
              setTxs(
                await getAddDeviceTxs(account.networkId, account.accountName),
              );
            }}
            isDisabled={loading || !!txs}
          >
            Add device
          </Button>
        </CardFooterGroup>
      </CardContentBlock>
      {!!txs && (
        <CardContentBlock title="Permissions">
          <Stack flexDirection="column" gap="md">
            <Permissions
              module="kadena.spirekey"
              capabilities={[
                {
                  name: 'ADD_DEVICE',
                  args: [account.accountName],
                },
              ]}
            />
            <Permissions
              module="coin"
              capabilities={[
                {
                  name: 'GAS',
                  args: [],
                },
              ]}
            />
          </Stack>
          <CardFooterGroup>
            <Button
              isLoading={isSubmitting}
              onPress={async () => {
                const txQueue = await signSubmitHd(
                  account.networkId,
                  txs,
                  autoTxs,
                );
                setAccount({
                  ...account,
                  txQueue: [...account.txQueue, ...txQueue],
                });
              }}
            >
              Sign
            </Button>
          </CardFooterGroup>
        </CardContentBlock>
      )}
    </>
  );
};
