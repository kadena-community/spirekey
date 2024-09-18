import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import {
  defaultSteps,
  OnBoardingStepper,
} from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { Button } from '@kadena/kode-ui';
import { FC, useState } from 'react';

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
  const [activeStep, setActiveStep] = useState<number | undefined>(undefined);
  const [steps, setSteps] = useState<string[]>(defaultSteps);

  const handleCreate = () => {
    setActiveStep(0);
    setSteps((v) => {
      v[0] = 'Create';
      return v;
    });
    onHandleRegisterWallet();
  };

  const handleImport = () => {
    setActiveStep(0);
    setSteps((v) => {
      v[0] = 'Import';
      return v;
    });
    onHandleConnectWallet();
  };

  return (
    <Layout
      title="Connect Wallet"
      description={
        'Do you wish to manage your wallet here on SpireKey? This will become your home of operation, your gateway into the a secure web 3 experience!'
      }
    >
      <OnBoardingStepper step={activeStep} steps={steps} />
      <LayoutContext />

      <LayoutActions>
        <Button variant="outlined" onPress={handleImport}>
          Import
        </Button>

        {networkId === 'mainnet01' && <Button>Create coming soon</Button>}
        {networkId !== 'mainnet01' && (
          <Button onPress={handleCreate}>Create</Button>
        )}
      </LayoutActions>
    </Layout>
  );
};
