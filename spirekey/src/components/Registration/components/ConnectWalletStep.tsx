import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { getRootkeyPasskeyName } from '@/utils/getNetworkDisplayName';
import { Button, Heading, Stack, Text } from '@kadena/kode-ui';
import { CardFooterGroup } from '@kadena/kode-ui/patterns';
import { FC } from 'react';

interface IProps {
  onHandleRegisterWallet: () => void;
  onHandleConnectWallet: () => void;
  networkId: string;
}

export const ConnectWalletStep: FC<IProps> = ({
  onHandleRegisterWallet,
  onHandleConnectWallet,
  networkId,
}) => {
  return (
    <Layout
      title="Connect Wallet"
      description={
        'Do you wish to manage your wallet here on SpireKey? This will become your home of operation, your gateway into the a secure web 3 experience!'
      }
    >
      <OnBoardingStepper />
      <Stack flexDirection="column" gap="md">
        <Heading as="h5">Already have a Kadena SpireKey wallet?</Heading>
        <Text>
          Provide your passkey named{' '}
          <Text bold>{getRootkeyPasskeyName(networkId)}</Text> to add another
          account to this wallet.
        </Text>
        <CardFooterGroup>
          <Button onPress={onHandleConnectWallet}>Connect</Button>
        </CardFooterGroup>
        <Heading as="h5">No wallet yet?</Heading>
        <Text>
          Create a new wallet using a passkey. This passkey will be stored on
          your device as <Text bold>{getRootkeyPasskeyName(networkId)}</Text>.
        </Text>
        <Text>
          This passkey will be used to perform maintenance operations as well as
          recovery operations. SpireKey will not use this key for signing!
        </Text>
      </Stack>

      <CardFooterGroup>
        {networkId === 'mainnet01' && <Button>Create coming soon</Button>}
        {networkId !== 'mainnet01' && (
          <Button onPress={onHandleRegisterWallet}>Create</Button>
        )}
      </CardFooterGroup>
    </Layout>
  );
};
