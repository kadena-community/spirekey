import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { Button } from '@kadena/kode-ui';
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
      <LayoutContext />

      <LayoutActions>
        <Button variant="outlined" onPress={onHandleConnectWallet}>
          Import
        </Button>

        {networkId === 'mainnet01' && <Button>Create coming soon</Button>}
        {networkId !== 'mainnet01' && (
          <Button onPress={onHandleRegisterWallet}>Create</Button>
        )}
      </LayoutActions>
    </Layout>
  );
};
