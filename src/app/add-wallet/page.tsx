'use client';
import { NetworkSelector } from '@/components/NetworkSelector';
import { Device } from '@/context/AccountContext';
import { useNetwork } from '@/context/NetworkContext';
import { useSign } from '@/hooks/useSign';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import { getAccountFrom } from '@/utils/account';
import {
  Button,
  Card,
  ContentHeader,
  Stack,
  TextField,
} from '@kadena/react-ui';
import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
  startRegistration,
} from '@simplewebauthn/browser';
import type { RegistrationResponseJSON } from '@simplewebauthn/typescript-types';
import cbor from 'cbor';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addDevice } from '../register/addDevice';

const getPublicKey = async (res: RegistrationResponseJSON) => {
  const { authData } = cbor.decode(
    base64URLStringToBuffer(res.response.attestationObject),
  );

  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach((value: number, index: number) =>
    dataView.setUint8(index, value),
  );
  const credentialIdLength = dataView.getUint16(0);
  const publicKeyBytes = authData.slice(55 + credentialIdLength);

  return Buffer.from(publicKeyBytes).toString('hex');
};

const getNewDevice = async (displayName: string): Promise<Device> => {
  const res = await startRegistration({
    challenge: bufferToBase64URLString(Buffer.from('some-random-string')),
    rp: {
      name: 'Kadena WebAuthN Wallet',
      id: window.location.hostname,
    },
    pubKeyCredParams: [
      {
        alg: -7,
        type: 'public-key',
      },
    ],
    authenticatorSelection: {
      requireResidentKey: true,
      userVerification: 'preferred',
    },
    attestation: 'direct',
    user: {
      id: displayName + Date.now(),
      displayName: displayName,
      name: displayName,
    },
    timeout: 60000,
  });
  if (!res.response.publicKey)
    throw new Error('No public key returned from webauthn');

  const pubKey = await getPublicKey(res);
  return {
    domain: window.location.hostname,
    name: displayName,
    ['credential-id']: res.id,
    guard: {
      keys: [pubKey],
      pred: 'keys-any',
    },
  };
};

type Props = {
  searchParams: {
    payload: string;
  };
};

export default function AddWallet({ searchParams }: Props) {
  const { register, getValues } = useForm({
    defaultValues: {
      account: '',
      displayName: '',
    },
    reValidateMode: 'onBlur',
  });
  const { network } = useNetwork();
  const { doSubmit, status } = useSubmit(searchParams);
  const { sign } = useSign('http://localhost:1337');
  const onAddDevice = async () => {
    const { account, displayName } = getValues();
    const newDevice = await getNewDevice(displayName);

    const acc = await getAccountFrom({
      caccount: account,
      networkId: network,
      namespace: process.env.NAMESPACE!,
    });
    const tx = await addDevice(acc.devices[0], acc, newDevice);
    console.log(tx);
    sign(tx, acc.devices[0], '/add-wallet');
  };

  useEffect(() => {
    if (status === SubmitStatus.SUBMITABLE) doSubmit();
  }, [status, doSubmit]);

  return (
    <Stack direction="column" gap="$md" margin="$md">
      <NetworkSelector />
      <Card fullWidth>
        <Stack direction="column" gap="$md" margin="$md">
          <ContentHeader
            heading="WebAuthn Wallet"
            description="Add this wallet to an existing account"
            icon="Account"
          />
          <TextField
            label="account"
            inputProps={{
              id: 'account',
              ...register('account', { required: true }),
            }}
          />
          <TextField
            label="Display Name"
            inputProps={{
              id: 'displayName',
              ...register('displayName', { required: true }),
            }}
          />
          <Button onClick={onAddDevice}>Add</Button>
        </Stack>
      </Card>
    </Stack>
  );
}
