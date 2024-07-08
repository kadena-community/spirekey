'use client';

import type { Account, Device } from '@kadena/spirekey-types';
import { startAuthentication } from '@simplewebauthn/browser';

import { Button } from '@/components/shared/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { getSignature } from '@/utils/getSignature';

import { getAccountsForTx } from '@/utils/consent';
import { publishEvent } from '@/utils/publishEvent';
import { Heading, MaskedValue, maskValue, Stack, Badge } from '@kadena/kode-ui';
import { ICap, ICommandPayload, IUnsignedCommand } from '@kadena/types';
import { LayoutSurface } from '../LayoutSurface/LayoutSurface';
import { useEffect, useRef, useState } from 'react';

interface Props {
  transaction?: string;
}

// @TODO get from other package?
const getPubkey = (
  accounts: Account[],
  credentialId: Device['credential-id'],
) => {
  for (const account of accounts) {
    for (const device of account.devices) {
      if (credentialId === device['credential-id']) {
        return device.guard.keys[0];
      }
    }
  }
  throw new Error('No public key found');
};

export default function Sign(props: Props) {
  const { transaction } = props;
  const { accounts } = useAccounts();
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false)

  if (!transaction) return;

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Get the current element from the ref
    const element = rowRef.current;

    // Add event listeners to the element
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    // Clean up event listeners on component unmount
    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const data = transaction
    ? Buffer.from(transaction, 'base64').toString()
    : null;
  const tx = JSON.parse(data ?? '{}');

  const txAccounts = getAccountsForTx(accounts)(tx);

  const onSign = async () => {
    const credentialId = accounts[0]?.devices[0]['credential-id'];

    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: window.location.hostname,
      allowCredentials: credentialId
        ? [{ id: credentialId, type: 'public-key' }]
        : undefined,
    });

    publishEvent('signed', {
      [tx.hash]: [
        {
          ...getSignature(res.response),
          pubKey: getPubkey(accounts, credentialId),
        },
      ],
    });
  };
  const { signers }: ICommandPayload = JSON.parse(tx.cmd);
  const keys = txAccounts.accounts.flatMap((a) =>
    a.devices.flatMap((d) => d.guard.keys),
  );
  const caps = signers
    .filter((s) => keys.includes(s.pubKey))
    .flatMap((s) => s.clist)
    .reduce((caps, cap) => {
      const module = cap?.name.replace(/\.(?:.(?!\.))+$/, '') || '';
      const moduleCaps = caps.get(module) || [];
      caps.set(module, [...moduleCaps, cap]);
      return caps;
    }, new Map());

  return (
    <LayoutSurface
      title="Permissions"
      subtitle="asked for the following x modules"
    >
      {[...caps.entries()].map(([k, v]) => (
        <div>
          <Heading>{k.replace(/^.*\./, '')}</Heading>
          <Heading variant="h4">{maskValue(k.replace(/\..*$/, ''))}</Heading>
          <Stack marginBlock="md" flexDirection="column">
            {v.map((c: ICap) => (
              <Stack flexDirection="row" justifyContent="space-between" gap="md" ref={rowRef}>
                <Stack flexDirection="column">
                  <Badge size='sm' style={isHovered ? 'highContrast' : 'default'}>{c.name.replace(/^.*\./g, '')}</Badge>
                </Stack>

                <Stack flexDirection="column" textAlign="right">
                  {c.args.map((a: any) => {
                    if (a.length > 44) return <MaskedValue value={a} />;
                    if (typeof a !== 'object') return <span>{a}</span>;
                    if (a.int) return <span>{a.int}</span>;
                    if (a.decimal) return <span>{a.decimal}</span>;
                    return <span>{JSON.stringify(a)}</span>;
                  })}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </div>
      ))}
      <Button variant="primary" onPress={onSign}>
        Sign
      </Button>
    </LayoutSurface>
  );
}
