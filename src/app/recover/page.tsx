'use client';

import { Button } from '@/components/Button/Button';
import { Account } from '@/context/AccountContext';
import { useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getAccountFrom } from '@/utils/account';
import { Heading, TextField } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const FORM_DEFAULT = {
  account: '',
};

const isAccount = (
  result: Account | null,
): result is Account & { network: string } => {
  return result !== null;
};

export default function Recover() {
  const { host } = useReturnUrl();
  const router = useRouter();
  const { storeAccount, mutateAccounts } = useAccounts();
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
          const acc = await getAccountFrom({
            caccount: account,
            networkId: network,
          });
          if (!acc) return null;
          return { ...acc, network };
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

    results.filter(isAccount).forEach((r) => {
      storeAccount({
        accountName: r.account,
        network: r.network,
        alias: 'Restored', // @todo: Provide a way to update the alias of an account
        devices: r.devices.map(d => ({
          ...d,
          deviceType: r.name.split('_')[0],
          color: r.name.split('_')[1],
          isRegistered: true,
        })),
      });
    });

    mutateAccounts();

    const caccount = encodeURIComponent(account);
    const cid = encodeURIComponent(authResult.id);
    router.push(`/accounts/${caccount}/devices/${cid}`);
  };

  return (
    <div
      className={atoms({
        paddingInline: 'lg',
        paddingBlock: 'lg',
      })}
    >
      <Heading>Recover</Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={atoms({
          marginBlockStart: 'lg',
          display: 'flex',
          gap: 'lg',
          flexDirection: 'column',
        })}
      >
        <TextField
          label="Account"
          {...{
            id: 'account',
            ...register('account', { required: true }),
          }}
          info="The c:account you want to recover"
          description="The c:account you want to recover"
        />
        <Button type="submit">Recover</Button>
      </form>
    </div>
  );
}