'use client';

import { Button } from '@/components/shared/Button/Button';
import { useAccounts, type Account } from '@/context/AccountsContext';
import { deviceColors } from '@/styles/shared/tokens.css';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getAccountFrom } from '@/utils/shared/account';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { Heading, TextField } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { startAuthentication } from '@simplewebauthn/browser';
import cbor from 'cbor';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const FORM_DEFAULT = {
  accountName: '',
};

const isAccount = (result: Account | null): result is Account => {
  return result !== null;
};

export default function Recover() {
  const router = useRouter();
  const { setAccount } = useAccounts();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: 'onBlur',
  });

  const networkMap = {
    Devnet: getDevnetNetworkId(),
    Testnet: 'testnet04',
    Mainnet: 'mainnet01',
  };

  const onSubmit = async () => {
    const authResult = await startAuthentication({
      challenge: 'doesnotreallymatter',
      rpId: window.location.hostname,
    });

    const userHandle = authResult.response.userHandle;
    const alias = userHandle?.split('(')[0].trim();
    const network = userHandle?.split('(')[1].split(')')[0] || 'Devnet';
    const networkId = networkMap[network];
    console.log(networkId);
    const domain = getChainwebDataUrl(networkId);
    const response = await fetch(
      `${domain}/txs/events?param=${authResult.id}&name=REGISTER&modulename=${process.env.NAMESPACE}.webauthn-guard`,
    );
    const json = await response.json();
    const requestKey = json[0].requestKey;

    const r = await fetch(`${domain}/txs/tx?requestkey=${requestKey}`);
    const j = await r.json();

    console.log(j.result);

    const accountName = j.result;

    if (!accountName) throw new Error('Account is required');

    const acc = await getAccountFrom({
      accountName,
      networkId,
    });

    // @TODO: Let the user fill in the alias, deviceType and color
    setAccount({
      accountName: acc.accountName,
      networkId: acc.networkId,
      alias: alias || '',
      devices: acc.devices.map((device) => ({
        ...device,
        deviceType: device.deviceType || 'phone',
        color: device.color || deviceColors.purple,
      })),
      balance: acc.balance,
    });

    router.push(`/`);
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
        <Button type="submit">Recover</Button>
      </form>
    </div>
  );
}
