'use client';

import { Button } from '@/components/Button/Button';
import { useAccounts, type Account } from '@/context/AccountsContext';
import { deviceColors } from '@/styles/tokens.css';
import { getAccountFrom } from '@/utils/account';
import { getDevnetNetworkId } from '@/utils/getDevnetNetworkId';
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
  const router = useRouter();
  const { setAccount } = useAccounts();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: 'onBlur',
  });

  const networks = ['mainnet01', 'testnet04', getDevnetNetworkId()];

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
      rpId: window.location.hostname,
      allowCredentials: uniqueDevices.map((d) => ({
        id: d['credential-id'],
        type: 'public-key',
      })),
    });

    results.filter(isAccount).forEach((account) => {
      // @TODO: Let the user fill in the alias, deviceType and color
      setAccount({
        accountName: account.accountName,
        network: account.network,
        alias: 'Restored',
        devices: account.devices.map((device) => ({
          ...device,
          deviceType: device.deviceType || 'phone',
          color: device.color || deviceColors.purple,
        })),
      });
    });

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
