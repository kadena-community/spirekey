'use client';
import { useSignTx } from '@/hooks/useSignTx';
import { useAccounts } from '@/resolvers/accounts';
import {
  Button,
  Select,
  SelectItem,
  Stack,
  TextareaField,
  TextField,
} from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';
import { useState } from 'react';

export default function PactPage() {
  const [networkId, setNetworkId] = useState('development');
  const [code, setCode] = useState('');
  const [capabilities, setCapabilities] = useState('');
  const [verifierCapabilities, setVerifierCapabilities] = useState('');
  const [data, setData] = useState('');
  const [chainId, setChainId] = useState<ChainId>('0');
  const [verifierName, setVerifierName] = useState('');
  const [proof, setProof] = useState('');
  const [account, setAccount] = useState<Account>();
  const [signedTx, setSignedTx] = useState('');
  const { accounts } = useAccounts();
  const { signTx } = useSignTx();

  const onSign = async () => {
    if (!account) throw new Error('No account selected');
    const signedTx = await signTx({
      publicKey: account.devices[0].guard.keys[0],
      accountName: account.accountName,
      verifierCapabilities,
      networkId,
      capabilities,
      proof,
      verifierName,
      data,
      code,
    });
    setSignedTx(JSON.stringify(signedTx, null, 2));
  };

  return (
    <CardFixedContainer>
      <CardContentBlock
        title="Tx builder"
        description="Build your tx and get it signed. Use sender00 if you just want a signature."
      >
        <Stack flexDirection="column" gap="md">
          <Select
            label="Chain"
            onSelectionChange={(c) => setChainId(c as ChainId)}
            selectedKey={chainId}
          >
            {Array(20)
              .fill(1)
              .map((_, i) => (
                <SelectItem key={i}>{i.toString()}</SelectItem>
              ))}
          </Select>
          <Select
            label="Network"
            onSelectionChange={(n) => setNetworkId(n as string)}
            selectedKey={networkId}
          >
            <SelectItem key="mainnet01">Mainnet</SelectItem>
            <SelectItem key="testnet04">Testnet</SelectItem>
            <SelectItem key="development">Devnet</SelectItem>
          </Select>
          <Select
            label="Account"
            onSelectionChange={(a) => {
              if (a === 'sender00')
                return setAccount({
                  accountName: 'sender00',
                  networkId,
                } as Account);
              setAccount(accounts.find((acc) => acc.accountName === a));
            }}
            selectedKey={account?.accountName}
          >
            {[
              ...accounts
                .filter((a) => a.networkId === networkId)
                .map((a) => (
                  <SelectItem key={a.accountName}>{a.alias}</SelectItem>
                )),
              <SelectItem key="sender00">Sender00</SelectItem>,
            ]}
          </Select>
        </Stack>
      </CardContentBlock>
      <Stack flexDirection="column" gap="md" marginBlock="md">
        <TextareaField label="code" value={code} onValueChange={setCode} />
        <TextareaField label="data" value={data} onValueChange={setData} />
        <TextareaField
          label="capabilities"
          value={capabilities}
          onValueChange={setCapabilities}
        />
      </Stack>
      <CardContentBlock
        title="Verifier Plugins"
        description="Optional: Add your verifier plugin here"
      >
        <Stack flexDirection="column" gap="md">
          <TextField
            label="verifier"
            value={verifierName}
            onValueChange={setVerifierName}
          />
          <TextField label="proof" value={proof} onValueChange={setProof} />
        </Stack>
      </CardContentBlock>
      <Stack flexDirection="column" gap="md">
        <TextareaField
          label="verifier capabilities"
          value={verifierCapabilities}
          onValueChange={setVerifierCapabilities}
        />
        <CardFooterGroup>
          <Button onPress={onSign}>Sign</Button>
        </CardFooterGroup>

        <TextareaField
          label="Signed TX"
          value={signedTx}
          onValueChange={setSignedTx}
        />
      </Stack>
    </CardFixedContainer>
  );
}
