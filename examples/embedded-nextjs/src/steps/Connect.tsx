import { useLocalState } from '@/hooks/useLocalState';
import { ChainId } from '@kadena/client';
import {
  Button,
  ProductIcon,
  Select,
  SelectItem,
  Stack,
} from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { atoms } from '@kadena/kode-ui/styles';
import { Account, connect, initSpireKey } from '@kadena/spirekey-sdk';
import { useEffect, useState } from 'react';
import { ExampleStepper } from './ExampleStepper';

export const ConnectStep = ({
  setAccount,
}: {
  setAccount: (account: Account) => void;
}) => {
  const [wallet, setWallet] = useLocalState(
    'wallet',
    'https://spirekey.kadena.io/',
  );
  const [networkId, setNetworkId] = useLocalState('networkId', 'testnet04');
  const [chainId, setChainId] = useLocalState('chainId', '14');
  const [isLoading, setIsLoading] = useState(false);
  const [isShownAdvancedOptions, setIsShownAdvancedOptions] = useState(false);

  useEffect(() => {
    initSpireKey({
      hostUrl: wallet,
    });
  }, [wallet]);
  const onConnect = async () => {
    try {
      setIsLoading(true);
      const account = await connect(networkId, chainId as ChainId);
      setAccount(account);
      setAccount(await account.isReady());
    } catch (e) {
      console.warn('User canceled', e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <CardFixedContainer>
        <CardContentBlock
          visual={<ProductIcon.QuickStart size="xl" />}
          title="Step 1: Connect your account"
          description="SpireKey SDK assists your users through the process of guiding funds between chains in order to interact with your dApp. Give it a try in this example."
          supportingContent={<ExampleStepper step={0} />}
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
            <Button
              variant="outlined"
              onPress={() => setIsShownAdvancedOptions(!isShownAdvancedOptions)}
              className={atoms({ marginInlineStart: 'auto' })}
            >
              {isShownAdvancedOptions
                ? 'Hide Advanced Options'
                : 'Show Advanced Options'}
            </Button>
          </Stack>
        </CardContentBlock>
        {isShownAdvancedOptions ? (
          <CardContentBlock
            title="Advanced Options"
            description="These options allow you to test this dApp using your local SpireKey instance. Additionally you can opt to use a different network."
          >
            <Stack flexDirection="column" gap="md">
              <Select
                label="Wallet"
                onSelectionChange={(w) => setWallet(w as string)}
                selectedKey={wallet}
              >
                <SelectItem key="https://spirekey.kadena.io/">
                  SpireKey
                </SelectItem>
                <SelectItem key="http://localhost:1337/">Local</SelectItem>
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
            </Stack>
          </CardContentBlock>
        ) : null}
      </CardFixedContainer>
      <CardFooterGroup>
        <Button isLoading={isLoading} onPress={onConnect}>
          Connect
        </Button>
      </CardFooterGroup>
    </>
  );
};
