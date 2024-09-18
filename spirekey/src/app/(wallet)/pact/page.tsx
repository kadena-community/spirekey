'use client';
import { accountName } from '@/resolvers/account-name';
import { useAccounts } from '@/resolvers/accounts';
import {
  createTransactionBuilder,
  IBuilder,
  ITransactionBuilder,
} from '@kadena/client';
import { addSigner } from '@kadena/client/fp';
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
import { sign } from '@kadena/spirekey-sdk';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';
import { useState } from 'react';

const addDataString = (dataString: string) => (builder: IBuilder<any>) => {
  try {
    const data = JSON.parse(dataString);
    return Object.entries(data).reduce(
      (b: IBuilder<any>, [key, value]: any) => b.addData(key, value),
      builder,
    );
  } catch (_) {
    return builder;
  }
};
const addCapabilityString = (capabilityString: string) => {
  const capsStr = capabilityString.match(/\(.*\)/g);
  if (!capsStr) return () => [];
  return (withCap: any) => {
    return capsStr.map((capStr) => {
      const [capName, ...args] = capStr.replace(/\(|\)/g, '').split(' ');
      return withCap(
        capName,
        args.map((a) => {
          if (/^".*"$/.test(a)) return a.replace(/^"|"$/g, '');
          if (/^\d+$/.test(a)) return { int: a };
          if (/^\d+\.\d+$/.test(a)) return { decimal: a };
          return JSON.parse(a);
        }),
      );
    });
  };
};

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

  const onSign = async () => {
    const addData = addDataString(data);
    const builder = createTransactionBuilder().execution(code);
    const tx = addData(builder)
      .setNetworkId(networkId)
      .setMeta({
        senderAccount: account?.accountName,
        gasLimit: 100_000,
      })
      .addVerifier(
        { name: verifierName, proof },
        addCapabilityString(verifierCapabilities),
      )
      .addSigner(
        {
          pubKey: account!.devices[0].guard.keys[0],
          scheme: 'WebAuthn',
        },
        addCapabilityString(capabilities),
      )
      .createTransaction();
    const {
      transactions: [signedTx],
    } = await sign([tx]);
    setSignedTx(JSON.stringify(signedTx, null, 2));
  };

  return (
    <CardFixedContainer>
      <CardContentBlock title="Tx builder">
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
            onSelectionChange={(a) =>
              setAccount(accounts.find((acc) => acc.accountName === a))
            }
            selectedKey={account?.accountName}
          >
            {accounts
              .filter((a) => a.networkId === networkId)
              .map((a) => (
                <SelectItem key={a.accountName}>{a.alias}</SelectItem>
              ))}
          </Select>
          <TextareaField label="code" value={code} onValueChange={setCode} />
          <TextareaField label="data" value={data} onValueChange={setData} />
          <TextareaField
            label="capabilities"
            value={capabilities}
            onValueChange={setCapabilities}
          />
          <TextField
            label="verifier"
            value={verifierName}
            onValueChange={setVerifierName}
          />
          <TextField label="proof" value={proof} onValueChange={setProof} />
          <TextareaField
            label="verifier capabilities"
            value={verifierCapabilities}
            onValueChange={setVerifierCapabilities}
          />
          <CardFooterGroup>
            <Button>Sign</Button>
          </CardFooterGroup>

          <TextareaField
            label="Signed TX"
            value={signedTx}
            onValueChange={setSignedTx}
          />
        </Stack>
      </CardContentBlock>
    </CardFixedContainer>
  );
}
