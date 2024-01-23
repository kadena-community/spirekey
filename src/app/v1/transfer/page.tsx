'use client';

import { NetworkSelector } from '@/components/NetworkSelector';
import { useNetwork } from '@/context/NetworkContext';
import { useAccounts } from '@/hooks/useAccounts';
import { useSign } from '@/hooks/useSign';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import { getAccountFrom } from '@/utils/account';
import { transfer } from '@/utils/transfer';
import {
  Button,
  Card,
  ContentHeader,
  Grid,
  GridItem,
  Notification,
  Stack,
  TextField,
} from '@kadena/react-ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FORM_DEFAULTS = {
  amount: '0',
  receiver: '',
};

type Props = {
  searchParams: {
    payload: string;
  };
};
export default function Page({ searchParams }: Props) {
  const { sign } = useSign(process.env.WALLET_URL!);
  const { activeAccount, activeDevice } = useAccounts();
  const { network } = useNetwork();
  const { getValues, register } = useForm({
    defaultValues: FORM_DEFAULTS,
    reValidateMode: 'onBlur',
  });
  const onSign = async () => {
    const amount = getValues('amount');
    const receiver = getValues('receiver');
    if (!activeAccount) throw new Error('No active account');
    if (!activeDevice) throw new Error('No active device');
    if (!amount || !receiver) throw new Error('Invalid form');
    const receiverAcc = await getAccountFrom({
      caccount: receiver,
      namespace: process.env.NAMESPACE!,
      networkId: network,
    });
    const tx = await transfer({
      amount: parseFloat(amount),
      sender: activeAccount.account,
      receiver: receiver,
      namespace: process.env.NAMESPACE!,
      networkId: network,
      publicKey: activeDevice.guard.keys[0],
      gasPayer: receiver,
    });
    sign(tx, activeDevice, '/transfer', [receiverAcc]);
  };
  const { doSubmit, status } = useSubmit(searchParams);
  useEffect(() => {
    if (status === SubmitStatus.SUBMITABLE) doSubmit();
  }, [status, doSubmit]);
  return (
    <Stack flexDirection="column" gap="md" margin="md">
      <NetworkSelector />
      <Card fullWidth>
        <Stack flexDirection="column" gap="md" margin="md">
          <ContentHeader
            heading="Transfer"
            description="Send KDA to another account"
            icon="BadgeAccount"
          />
          {status === SubmitStatus.LOADING && (
            <Notification role="status" intent="info" isDismissable>
              Transfer in progress
            </Notification>
          )}
          {status === SubmitStatus.SUCCESS && (
            <Notification role="status" intent="positive" isDismissable>
              Transfer successful
            </Notification>
          )}
          <form>
            <Grid
              columns={{
                xs: 3,
              }}
              gap="xs"
            >
              <GridItem columnSpan={2}>
                <TextField
                  label="to"
                  {...{
                    id: 'receiver',
                    type: 'text',
                    ...register('receiver'),
                  }}
                />
              </GridItem>
              <GridItem>
                <TextField
                  label="amount"
                  {...{
                    id: 'amount',
                    type: 'number',
                    step: '0.001',
                    min: '0',
                    ...register('amount'),
                  }}
                />
              </GridItem>
            </Grid>
          </form>
          <Button onClick={onSign}>Send</Button>
        </Stack>
      </Card>
    </Stack>
  );
}
