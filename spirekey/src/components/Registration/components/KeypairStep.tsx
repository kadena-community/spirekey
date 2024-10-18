import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { ImportAccountAnimation } from '@/components/RegistrationAnimations/ImportAccountAnimation';
import { WalletAnimation } from '@/components/RegistrationAnimations/WalletAnimation';
import { Button, Stack } from '@kadena/kode-ui';
import React, { FC, useState } from 'react';

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
  setAnimationFinished,
  succesfulAuthentication,
  isSubmitting,
  onSubmit,
  onImport,
  steps,
}) => {
  const [hoveredImport, setHoveredImport] = useState(false);
  const [hoveredContinue, setHoveredContinue] = useState(false);

  const handleSubmit = () => {
    onSubmit();
    setAnimationFinished(true);
  };
  const handleImport = () => {
    onImport();
    setAnimationFinished(true);
  };

  return (
    <Layout
      title={steps[1]}
      description={
        'Create a new account or import and add an existing account tied to your wallet.'
      }
    >
      <OnBoardingStepper step={1} steps={steps} />
      <LayoutContext>
        <WalletAnimation
          disableCreateButton={isSubmitting || succesfulAuthentication}
          disableImportButton={isSubmitting || succesfulAuthentication}
          animateImport={hoveredImport}
          animateCreate={hoveredContinue}
          onImportClick={handleImport}
          onCreateClick={handleSubmit}
          Child={ImportAccountAnimation}
        />
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
            onPress={handleImport}
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
            onPress={handleSubmit}
            isDisabled={isSubmitting || succesfulAuthentication}
          >
            Create
          </Button>
        </Stack>
      </LayoutActions>
    </Layout>
  );
};
