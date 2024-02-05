'use client';

import { Button } from '@/components/Button/Button';
import { QRCode } from '@/components/QRCode';
import { useAccounts } from '@/context/AccountsContext';
import { useSign } from '@/hooks/useSign';
import { getLabels } from '@/utils/signUtils';
import {
  Box,
  Heading,
  ProductIcon,
  Stack,
  SystemIcon,
  Text,
  TextField,
  Tooltip,
} from '@kadena/react-ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SignProps {
  searchParams: {
    payload: string;
    returnUrl: string;
    cid: string;
    signers: string;
    originReturnUrl: string;
    optimistic?: boolean;
  };
}

export default function Sign(req: SignProps) {
  const {
    payload,
    returnUrl,
    cid,
    signers,
    originReturnUrl,
    optimistic = false,
  } = req.searchParams;
  const [ isReadyToSign, setIsReadyToSign ] = useState<boolean>(true);
  const router = useRouter();
  const { accounts } = useAccounts();
  const data = payload ? Buffer.from(payload, 'base64').toString() : null;
  const { sign, signUrl, signPath } = useSign(process.env.WALLET_URL!);

  const tx = JSON.parse(data ?? '{}');
  const txData = JSON.parse(tx.cmd || '{}');

  const [language, setLanguage] = useState('en');

  const publicKeys = txData.signers.map((s: { pubKey: string; }) => s.pubKey);

  if (publicKeys.length === 0) {
    // @todo: deal with multiple public keys
    throw new Error('No signers defined in transaction.');
  }

  const publicKey = publicKeys[0];

  const account = accounts.find(a => a.devices.map(d => d.guard.keys.includes(publicKey)));
  const devices = account?.devices;
  const device = devices?.find(d => d['credential-id'] === cid);

  if (! device) {
    // @todo: handle edge case where device does not exist on any account
    throw new Error('Unknown device');
  }

  useEffect(() => {
    const isAccountMinted = device !== null && ! device?.pendingRegistrationTx;
    setIsReadyToSign((!optimistic && isAccountMinted) || optimistic);
  }, [device, optimistic, setIsReadyToSign]);

  const onSign = async () => {
    const signedTx = await sign(tx, cid, signers, originReturnUrl);

    router.push(
      `${returnUrl}?payload=${Buffer.from(JSON.stringify(signedTx)).toString(
        'base64',
      )}`,
    );
  };

  return (
    <>
      {! isReadyToSign && <div>Minting account...</div>}
      {isReadyToSign &&
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

          {!signUrl && <Button onPress={onSign}>Sign</Button>}

          {signUrl && signPath && (
            <Stack flexDirection="column" gap="md" margin="md">
              <QRCode url={signPath} />
              <TextField id="signUrl" value="signUrl" isReadOnly />
            </Stack>
          )}
        </Stack>
      }
    </>
  );
}
