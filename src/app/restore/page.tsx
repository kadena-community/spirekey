'use client';

import { Account } from '@/context/AccountContext';
import { getAccountFrom } from '@/utils/account';
import { Heading, TextField } from '@kadena/react-ui';
import { Button } from 'react-aria-components';
import { useForm } from 'react-hook-form';

const FORM_DEFAULT = {
  account: '',
};

const isAccount = (result: Account | null): result is Account => {
  return result !== null;
};

export default function Restore() {
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: 'onBlur',
  });

  const networks = ['mainnet01', 'testnet04', 'fast-development'];

  const onSubmit = async () => {
    const { account } = getValues();
    if (!account) throw new Error('Account is required');
    const results = await Promise.all(
      networks.map(async (network) => {
        try {
          return await getAccountFrom({
            caccount: account,
            networkId: network,
          });
        } catch (e) {
          console.log(e);
          return null;
        }
      }),
    );
    const devices = results.filter(isAccount).flatMap((r) => r.devices);

    const uniqueDevices = Array.from(
      devices
        .reduce(
          (allUniqueDevices, d) => allUniqueDevices.set(d['credential-id'], d),
          new Map(),
        )
        .values(),
    );
    console.log(uniqueDevices);
  };

  return (
    <>
      <Heading>Restore</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Account"
          {...{
            id: 'account',
            ...register('account', { required: true }),
          }}
          info="The c:account you want to restore"
          helperText="The c:account you want to restore"
        />
        <Button type="submit">Restore</Button>
      </form>
    </>
  );
}

