import PasskeyCard from '@/components/Card/PasskeyCard';
import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { Button, Stack } from '@kadena/kode-ui';
import React, { FC } from 'react';
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
  setAnimationFinished,
  succesfulAuthentication,
  isSubmitting,
  onSubmit,
  onImport,
  steps,
}) => {
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
          <PasskeyCard
            isInProgress={!succesfulAuthentication && isSubmitting}
            isSuccessful={succesfulAuthentication}
            onSuccessfulAnimationEnd={() => setAnimationFinished(true)}
            onSubmit={onSubmit}
          />
        </Stack>
      </LayoutContext>
      <LayoutActions>
        <Button
          variant="outlined"
          onPress={onImport}
          isDisabled={isSubmitting || succesfulAuthentication}
        >
          Import
        </Button>

        <Button
          variant="primary"
          onPress={onSubmit}
          isDisabled={isSubmitting || succesfulAuthentication}
        >
          Continue
        </Button>
      </LayoutActions>
    </Layout>
  );
};
