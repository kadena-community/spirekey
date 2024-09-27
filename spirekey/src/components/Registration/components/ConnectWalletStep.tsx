import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { FLOWTYPE } from '@/components/OnBoarding/components/OnBoardingStepper/utils';
import { ConnectWalletAnimation } from '@/components/RegistrationAnimations/ConnectWalletAnimation';
import { WalletAnimation } from '@/components/RegistrationAnimations/WalletAnimation';
import { useWallet } from '@/hooks/useWallet';
import { Button, Stack } from '@kadena/kode-ui';
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
  const [hoveredConnectWallet, setHoveredConnectWallet] = useState(false);
  const [hoveredCreateWallet, setHoveredCreateWallet] = useState(false);
  const { getWallet } = useWallet();
  const hasWallet = !!getWallet(networkId);

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
      <LayoutContext>
        <WalletAnimation
          disableCreateButton={networkId === 'mainnet01' || hasWallet}
          animateImport={hoveredConnectWallet}
          animateCreate={hoveredCreateWallet}
          onImportClick={handleImport}
          onCreateClick={handleCreate}
          Child={ConnectWalletAnimation}
        />
      </LayoutContext>

      <LayoutActions>
        <Stack
          as="span"
          onMouseEnter={() => {
            setHoveredConnectWallet(true);
          }}
          onMouseLeave={() => {
            setHoveredConnectWallet(false);
          }}
        >
          <Button
            variant={hasWallet ? 'primary' : 'outlined'}
            onPress={handleImport}
          >
            Connect
          </Button>
        </Stack>

        {networkId === 'mainnet01' && !hasWallet && (
          <Button>Create coming soon</Button>
        )}
        {networkId !== 'mainnet01' && !hasWallet && (
          <Stack
            as="span"
            onMouseEnter={() => {
              setHoveredCreateWallet(true);
            }}
            onMouseLeave={() => {
              setHoveredCreateWallet(false);
            }}
          >
            <Button onPress={handleCreate}>Create</Button>
          </Stack>
        )}
      </LayoutActions>
    </Layout>
  );
};
