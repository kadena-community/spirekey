import type { Device } from '@/context/AccountContext';
import { CredentialPair, usePubkeys } from '@/hooks/usePubkeys';
import { Button, Select, Stack, TextField } from '@kadena/react-ui';
import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
  startRegistration,
} from '@simplewebauthn/browser';
import { RegistrationResponseJSON } from '@simplewebauthn/types';
import cbor from 'cbor';
import { useState } from 'react';

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

export const AddDevice = ({
  onAddDevice,
}: {
  onAddDevice: (device: Device) => void;
}) => {
  const [deviceName, setDeviceName] = useState<string>('');
  const [cPair, setCPair] = useState<CredentialPair>();
  const { pubkeys } = usePubkeys();
  const onDeviceNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDeviceName(e.target.value);
  const onCidChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCPair(pubkeys.find((p) => p.cid === e.target.value));

  const register = async () => {
    if (cPair) {
      return onAddDevice({
        domain: window.location.hostname,
        name: deviceName,
        ['credential-id']: cPair.cid,
        guard: {
          keys: [cPair.pubkey],
          pred: 'keys-any',
        },
      });
    }

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
        id: deviceName + Date.now(),
        displayName: deviceName,
        name: deviceName,
      },
      timeout: 60000,
    });
    if (!res.response.publicKey)
      throw new Error('No public key returned from webauthn');

    const pubKey = await getPublicKey(res);
    onAddDevice({
      domain: window.location.hostname,
      name: deviceName,
      ['credential-id']: res.id,
      guard: {
        keys: [pubKey],
        pred: 'keys-any',
      },
    });
  };
  return (
    <Stack flexDirection="column">
      <TextField
        label="device name"
        {...{
          id: 'device-name',
          value: deviceName,
          onChange: onDeviceNameChange,
        }}
        description="Enter the name of your device"
      />
      <Select
        label="credential id"
        {...{
          id: 'credential-id',
          onChange: onCidChange,
          ariaLabel: 'credential id',
        }}
        description="Enter the credential id of your previously registered device (optional)"
      >
        {pubkeys.map((p) => (
          <option key={p.cid} value={p.cid}>
            {p.cid}
          </option>
        ))}
      </Select>

      <Button onClick={register}>Add Device</Button>
    </Stack>
  );
};
