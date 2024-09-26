import { Permissions } from '@/components/Permissions/Permissions';
import { useAccounts } from '@/resolvers/accounts';
import { useAddDevice } from '@/resolvers/add-device';
import { useSignHd } from '@/resolvers/sign-hd';
import { Button, Stack, TextareaField } from '@kadena/kode-ui';
import { CardContentBlock, CardFooterGroup } from '@kadena/kode-ui/patterns';
import { useState } from 'react';

export const AddDevice = ({ accountName }: { accountName?: string }) => {
  const { accounts, loading } = useAccounts();
  const { getAddDeviceTxs } = useAddDevice();
  const [txs, setTxs] = useState();
  const account = accounts?.find((a) => a.accountName === accountName);
  const { signHd } = useSignHd();
  if (!account) return null;
  return (
    <>
      <CardContentBlock title="Add Device">
        <CardFooterGroup>
          <Button
            onPress={async () =>
              setTxs(
                await getAddDeviceTxs(account.networkId, account.accountName),
              )
            }
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
            <Button onPress={() => signHd(account.networkId, txs)}>Sign</Button>
          </CardFooterGroup>
        </CardContentBlock>
      )}
    </>
  );
};
