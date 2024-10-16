import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { FLOWTYPE } from '@/components/OnBoarding/components/OnBoardingStepper/utils';
import { ConnectWalletAnimation } from '@/components/RegistrationAnimations/ConnectWalletAnimation';
import { WalletAnimation } from '@/components/RegistrationAnimations/WalletAnimation';
import { useWallet } from '@/hooks/useWallet';
import { Button, Checkbox, Stack } from '@kadena/kode-ui';
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
  const [hasReadToS, setHasReadTos] = useState(false);
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
          disableCreateButton={hasWallet || !hasReadToS}
          disableImportButton={!hasReadToS}
          animateImport={hoveredConnectWallet}
          animateCreate={hoveredCreateWallet}
          onImportClick={handleImport}
          onCreateClick={handleCreate}
          Child={ConnectWalletAnimation}
        />
      </LayoutContext>

      <LayoutActions>
        <Stack flexDirection="column" width="100%" gap="md" alignItems="center">
          <Stack alignItems="center" gap="sm">
            <Checkbox
              onChange={() => setHasReadTos((v) => !v)}
              key="HasReadToS"
              value="true"
              aria-label="I have read & agree to the Terms of Service"
            >
              I have read & agree to the
            </Checkbox>
            <a href="https://www.kadena.io/chainweaver-tos" target="_blank">
              Terms of Service
            </a>
          </Stack>

          <Stack width="100%" justifyContent="space-between">
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
                isDisabled={!hasReadToS}
                variant={hasWallet ? 'primary' : 'outlined'}
                onPress={handleImport}
              >
                Connect
              </Button>
            </Stack>

            {!hasWallet && (
              <Stack
                as="span"
                onMouseEnter={() => {
                  setHoveredCreateWallet(true);
                }}
                onMouseLeave={() => {
                  setHoveredCreateWallet(false);
                }}
              >
                <Button isDisabled={!hasReadToS} onPress={handleCreate}>
                  Create
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </LayoutActions>
    </Layout>
  );
};
