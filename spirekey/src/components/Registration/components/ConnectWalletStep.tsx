import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { FLOWTYPE } from '@/components/OnBoarding/components/OnBoardingStepper/utils';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@kadena/kode-ui';
import { FC, useState } from 'react';

interface IProps {
  onHandleRegisterWallet: () => void;
  onHandleConnectWallet: () => void;
  networkId: string;
  setFlowType: React.Dispatch<
    React.SetStateAction<keyof typeof FLOWTYPE | undefined>
  >;
  steps: string[];
}

export const ConnectWalletStep: FC<IProps> = ({
  onHandleRegisterWallet,
  onHandleConnectWallet,
  networkId,
  setFlowType,
  steps,
}) => {
  const [activeStep, setActiveStep] = useState<number | undefined>(undefined);
  const { getWallet } = useWallet();
  const hasWallet = getWallet(networkId);
  //const [steps, setSteps] = useState<string[]>(defaultSteps);

  const handleCreate = () => {
    setActiveStep(0);
    setFlowType(FLOWTYPE.CREATE);
    onHandleRegisterWallet();
  };

  const handleImport = () => {
    setActiveStep(0);
    setFlowType(FLOWTYPE.IMPORT);
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
        <Button
          variant={hasWallet ? 'primary' : 'outlined'}
          onPress={handleImport}
        >
          Import
        </Button>

        {networkId === 'mainnet01' && !hasWallet && (
          <Button>Create coming soon</Button>
        )}
        {networkId !== 'mainnet01' && !hasWallet && (
          <Button onPress={handleCreate}>Create</Button>
        )}
      </LayoutActions>
    </Layout>
  );
};
