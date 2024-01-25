'use client';

import { Account } from '@/context/AccountContext';
import { useAccounts } from '@/hooks/useAccounts';
import { getAccountFrom } from '@/utils/account';
import { Heading, TextField } from '@kadena/react-ui';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { Button } from 'react-aria-components';
import { useForm } from 'react-hook-form';

const FORM_DEFAULT = {
  account: '',
};

const isAccount = (result: Account | null): result is Account => {
  return result !== null;
};

export default function Restore() {
  const router = useRouter();
  const { storeAccount } = useAccounts();
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
    const authResult = await startAuthentication({
      challenge: 'doesnotreallymatter',
      rpId: 'localhost',
      allowCredentials: uniqueDevices.map((d) => ({
        id: d['credential-id'],
        type: 'public-key',
      })),
    });

    await storeAccount(account);
    const caccount = encodeURIComponent(account);
    const cid = encodeURIComponent(authResult.id);
    router.push(`/accounts/${caccount}/devices/${cid}`);
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
          description="The c:account you want to restore"
        />
        <Button type="submit">Restore</Button>
      </form>
    </>
  );
}
