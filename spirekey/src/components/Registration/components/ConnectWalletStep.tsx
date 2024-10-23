import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { FLOWTYPE } from '@/components/OnBoarding/components/OnBoardingStepper/utils';
import { ConnectWalletAnimation } from '@/components/RegistrationAnimations/ConnectWalletAnimation';
import { WalletAnimation } from '@/components/RegistrationAnimations/WalletAnimation';
import { useWallet } from '@/hooks/useWallet';
import { Button, Checkbox, Stack, TextLink } from '@kadena/kode-ui';
import { FC, useState } from 'react';
import { textLinkToS } from './style.css';

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
        'Generate a new wallet and account or connect to an existing Spirekey enabled wallet.'
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
        <Stack
          flexDirection="column"
          width="100%"
          gap="xxl"
          alignItems="flex-start"
        >
          <Stack alignItems="center" gap="sm">
            <Checkbox
              onChange={() => setHasReadTos((v) => !v)}
              key="HasReadToS"
              value="true"
              aria-label="I have read & agree to the Terms and Conditions"
            >
              I have read & agree to the
            </Checkbox>
            <TextLink
              href="https://kadena.io/spirekey-license"
              target="_blank"
              className={textLinkToS}
            >
              Terms and Conditions
            </TextLink>
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
