import PasskeyCard from '@/components/Card/PasskeyCard';
import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { WalletAnimation } from '@/components/RegistrationAnimations/WalletAnimation';
import { Button, Stack } from '@kadena/kode-ui';
import React, { FC, useState } from 'react';
import { passkeyWrapperClass } from './styles.css';

interface IProps {
  setAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
  succesfulAuthentication: boolean;
  isSubmitting: boolean;
  onCancel?: () => void;
  onSubmit: () => void;
  onImport: () => void;
  steps: string[];
}

export const KeypairStep: FC<IProps> = ({
  succesfulAuthentication,
  isSubmitting,
  onSubmit,
  onImport,
  steps,
}) => {
  const [hoveredImport, setHoveredImport] = useState(false);
  const [hoveredContinue, setHoveredContinue] = useState(false);
  return (
    <Layout
      title={steps[1]}
      description={
        'your account to manage your web3 assets managed by your SpireKey wallet.'
      }
    >
      <OnBoardingStepper step={1} steps={steps} />
      <LayoutContext>
        <Stack className={passkeyWrapperClass}>
          <WalletAnimation
            disableCreateButton={isSubmitting || succesfulAuthentication}
            disableImportButton={isSubmitting || succesfulAuthentication}
            animateImport={hoveredImport}
            animateCreate={hoveredContinue}
            onImportClick={onImport}
            onCreateClick={onSubmit}
          />
        </Stack>
      </LayoutContext>
      <LayoutActions>
        <Stack
          as="span"
          onMouseEnter={() => {
            setHoveredImport(true);
          }}
          onMouseLeave={() => {
            setHoveredImport(false);
          }}
        >
          <Button
            variant="outlined"
            onPress={onImport}
            isDisabled={isSubmitting || succesfulAuthentication}
          >
            Import
          </Button>
        </Stack>

        <Stack
          as="span"
          onMouseEnter={() => {
            setHoveredContinue(true);
          }}
          onMouseLeave={() => {
            setHoveredContinue(false);
          }}
        >
          <Button
            variant="primary"
            onPress={onSubmit}
            isDisabled={isSubmitting || succesfulAuthentication}
          >
            Continue
          </Button>
        </Stack>
      </LayoutActions>
    </Layout>
  );
};
