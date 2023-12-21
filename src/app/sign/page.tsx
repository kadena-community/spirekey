'use client';

import { ICap } from '@kadena/client';
import {
  Box,
  Button,
  Heading,
  ProductIcon,
  Select,
  Stack,
  SystemIcon,
  Text,
  Tooltip,
} from '@kadena/react-ui';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type SignProps = {
  searchParams: {
    payload: string;
    returnUrl: string;
    cid: string;
  };
};

/* valueLabels to be used to explain cmd.code */
const capTranslations: Record<string, any> = {
  [`${process.env.NAMESPACE}.webauthn-wallet.TRANSFER`]: {
    default: 'nl',
    en: {
      title: 'Transfer',
      description: 'Transfer {{2}} KDA from {{0}} to {{1}}',
      valueLabels: ['From', 'To', 'Amount'],
    },
    nl: {
      title: 'Transfer',
      description: 'Transfer {{2}} KDA van {{0}} naar {{1}}',
      valueLabels: ['Van', 'Naar', 'Hoeveelheid'],
    },
  },
  [`${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`]: {
    default: 'nl',
    en: {
      title: 'Gas payer',
      description: 'You will pay for the transaction costs',
    },
    nl: {
      title: 'Gas payer',
      description: 'Jij betaalt de transactiekosten',
    },
  },
};

const getDescription = (key: string, args: any, language: string) => {
  const translation =
    capTranslations?.[key]?.[language] ||
    capTranslations[key]?.[capTranslations[key]?.default];

  if (!translation) return null;

  return {
    title: translation.title,
    description: translation.description.replace(
      /\{\{(\w+)\}\}/g,
      (match: string, index: string) => args[parseInt(index, 10)] || match,
    ),
  };
};

const getArgValue = (x: any) => (x?.decimal ? x.decimal : x?.int ? x.int : x);

const getLabels = (signers: any[], language: string) =>
  signers.flatMap((signer) =>
    Array.isArray(signer.clist)
      ? signer.clist.flatMap((c: ICap) => {
          const { title, description } =
            getDescription(c.name, c.args, language) || {};
          const valuesString = c.args.map(getArgValue).join(', ');

          return [
            title
              ? {
                  raw: c,
                  label: title,
                  description,
                  valuesString,
                }
              : { raw: c, label: c.name, values: valuesString },
          ];
        })
      : [],
  );

export default function Sign(req: SignProps) {
  const { payload, returnUrl, cid } = req.searchParams;
  const router = useRouter();
  const data = payload ? Buffer.from(payload, 'base64').toString() : null;
  const tx = JSON.parse(data ?? '{}');
  const txData = JSON.parse(tx.cmd || '{}');

  const [language, setLanguage] = useState('en');

  const sign = useCallback(async () => {
    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: window.location.hostname,
      allowCredentials: cid ? [{ id: cid, type: 'public-key' }] : undefined,
    });
    router.push(
      `${returnUrl}?payload=${payload}&response=${Buffer.from(
        JSON.stringify(res),
      ).toString('base64')}`,
    );
  }, [data, router, startAuthentication]);

  return (
    <Stack direction="column" gap="$md" alignItems="center" margin="$xl">
      <h1>Wallet</h1>

      <Stack gap="$sm" alignItems="center">
        <ProductIcon.ManageKda size="lg" />
        <Heading variant="h5">Preview and sign transaction</Heading>
      </Stack>

      <Heading variant="h5">Transaction details</Heading>

      <Select
        id="lanuage"
        ariaLabel="Chain ID"
        onChange={(evt) => setLanguage(evt.currentTarget.value)}
      >
        <option value="">Select language</option>
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
        <option value="fr">Français</option>
      </Select>

      {getLabels(txData.signers, language).map((x) => (
        <Box key={x.label} width="100%">
          <Heading variant="h6">{x.label}</Heading>
          <Stack alignItems="center" gap="$1">
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
          <Box marginTop="$sm">
            <Text font="mono" size="md">
              <details>
                <summary>View raw capability</summary>
                <Text bold size="md">
                  Capability:
                </Text>{' '}
                {x.raw.name}
                <br />
                {x.valuesString && (
                  <>
                    <Text bold size="md">
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
        <Text font="mono" size="md">
          <details>
            <summary>View raw transaction</summary>
            <pre>{JSON.stringify({ ...tx, cmd: txData }, null, 2)}</pre>
          </details>
        </Text>
      </Box>

      <Button onClick={sign}>Sign</Button>
    </Stack>
  );
}
