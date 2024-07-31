import { useLocalState } from '@/hooks/useLocalState';
import {
  CardContainer,
  CardContentBlock,
  CardFooter,
} from '@/steps/CardPattern/CardPattern';
import { ChainId } from '@kadena/client';
import {
  Button,
  ProductIcon,
  Select,
  SelectItem,
  Stack,
} from '@kadena/kode-ui';
import { Account, connect, initSpireKey } from '@kadena/spirekey-sdk';
import { useEffect, useState } from 'react';
import { ExampleStepper } from './ExampleStepper';
import { stackedButtonClass } from './CardPattern/CardPattern.css';

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
      useRAccount: true,
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
      <CardContainer hasPadding>
        <CardContentBlock
          visual={<ProductIcon.QuickStart size="xl" />}
          title="Step 1: Connect your account"
          description={<ExampleStepper step={0} />}
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
              onClick={() => setIsShownAdvancedOptions(
                !isShownAdvancedOptions)
              }
              className={stackedButtonClass}
            >{isShownAdvancedOptions ? "Hide Advanced Options" : "Show Advanced Options"}</Button>
          </Stack>
        </CardContentBlock>
        {isShownAdvancedOptions ?
          <CardContentBlock isNewSection titleAs="h5" title="Advanced Options" description="Guide the user about why they would want to set these settings...">
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
        : null }
      </CardContainer>
      <CardFooter>
        <Button isLoading={isLoading} onPress={onConnect}>
          Connect
        </Button>
      </CardFooter>
    </>
  );
};
