'use client';

import { Button } from '@/components/Button/Button';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink';
import { useAccounts } from '@/context/AccountsContext';
import { useSign } from '@/hooks/useSign';
import { getDeviceByPublicKey } from '@/utils/getDeviceByPublicKey';
import { getLabels } from '@/utils/signUtils';
import {
  Box,
  Heading,
  ProductIcon,
  Stack,
  SystemIcon,
  Text,
  Tooltip,
} from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SignProps {
  searchParams: {
    payload: string;
    returnUrl: string;
    optimistic?: boolean;
  };
}

export default function Sign(req: SignProps) {
  const { payload, returnUrl, optimistic = false } = req.searchParams;
  const [autoRedirect, setAutoRedirect] = useState<boolean>(true);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(true);
  const [redirectLocation, setRedirectLocation] = useState<string>('');
  const router = useRouter();
  const { accounts } = useAccounts();
  const data = payload ? Buffer.from(payload, 'base64').toString() : null;
  const { sign } = useSign();
  const [language, setLanguage] = useState('en');

  const tx = JSON.parse(data ?? '{}');
  const txData = JSON.parse(tx.cmd || '{}');

  const publicKeys: string[] = txData.signers.map(
    (s: { pubKey: string }) => s.pubKey,
  );

  if (publicKeys.length === 0) {
    // @todo: deal with multiple public keys
    throw new Error('No signers defined in transaction.');
  }

  const devices = publicKeys.map((publicKey) =>
    getDeviceByPublicKey(accounts, publicKey),
  );

  const pendingRegistrationTxs = devices.map(
    (device) => device?.pendingRegistrationTx,
  );

  useEffect(() => {
    setIsReadyToSubmit(
      (!optimistic && !!pendingRegistrationTxs.length) || optimistic,
    );
  }, [devices, optimistic, setIsReadyToSubmit]);

  useEffect(() => {
    if (isReadyToSubmit && redirectLocation && autoRedirect) {
      router.push(redirectLocation);
    }
  }, [redirectLocation, isReadyToSubmit, router, returnUrl, autoRedirect]);

  const onSign = async () => {
    const signedTx = await sign(tx, devices?.[0]?.['credential-id']!);

    const params = new URLSearchParams();
    params.append(
      'transaction',
      Buffer.from(JSON.stringify(signedTx)).toString('base64'),
    );

    if (optimistic && pendingRegistrationTxs) {
      params.append(
        'pendingTxIds',
        encodeURIComponent(JSON.stringify(pendingRegistrationTxs)),
      );
    }

    setRedirectLocation(`${returnUrl}?${params.toString()}`);
  };

  const onAutoRedirectChange = () => {
    setAutoRedirect(!autoRedirect);
  };

  return (
    <>
      <Stack flexDirection="column" gap="md" alignItems="center" margin="xl">
        <Stack gap="sm" alignItems="center">
          <ProductIcon.ManageKda size="lg" />
          <Heading variant="h5">Preview and sign transaction</Heading>
        </Stack>

        <Heading variant="h5">Transaction details</Heading>

        {/* <Select
          id="lanuage"
          label="Language"
          onChange={(evt) => setLanguage(evt.currentTarget.value)}
        >
          <SelectItem>
            <option value="">Select language</option>
          </SelectItem>
          <SelectItem>
            <option value="en">English</option>
          </SelectItem>
          <SelectItem>
            <option value="nl">Nederlands</option>
          </SelectItem>
          <SelectItem>
            <option value="fr">Français</option>
          </SelectItem>
        </Select> */}

        {getLabels(txData.signers, language).map((x) => (
          <Box key={x.label} width="100%">
            <Heading variant="h6">{x.label}</Heading>
            <Stack alignItems="center" gap="sm">
              <Text>{x.description ?? 'No description available'}</Text>
              {!x.description && (
                <Tooltip
                  content="The owner of this smart contract hasn't provided a description for
                this type of transaction yet."
                >
                  <SystemIcon.AlertCircleOutline size="sm" />
                </Tooltip>
              )}
            </Stack>
            <Box marginBlockStart="sm">
              <Text variant="base">
                <details>
                  <summary>View raw capability</summary>
                  <Text bold variant="base">
                    Capability:
                  </Text>{' '}
                  {x.raw.name}
                  <br />
                  {x.valuesString && (
                    <>
                      <Text bold variant="base">
                        Values:
                      </Text>{' '}
                      {x.valuesString}
                    </>
                  )}
                </details>
              </Text>
            </Box>
          </Box>
        ))}

        <Box width="100%">
          <Text variant="base">
            <details>
              <summary>View raw transaction</summary>
              <pre>{JSON.stringify({ ...tx, cmd: txData }, null, 2)}</pre>
            </details>
          </Text>
        </Box>

        <Button onPress={onSign}>Sign</Button>

        <Stack flexDirection="column" gap="md" margin="xl">
          {!isReadyToSubmit && <p>Minting...</p>}
          {!redirectLocation && !isReadyToSubmit && (
            <label>
              <input
                type="checkbox"
                checked={autoRedirect}
                onChange={onAutoRedirectChange}
              />
              Go back to {returnUrl} when ready
            </label>
          )}

          {redirectLocation && isReadyToSubmit && (
            <ButtonLink href={redirectLocation}>
              Go back to ${returnUrl}
            </ButtonLink>
          )}
        </Stack>
      </Stack>
    </>
  );
}
