import PasskeyCard from '@/components/Card/PasskeyCard';
import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { Button } from '@kadena/kode-ui';
import { CardFooterGroup } from '@kadena/kode-ui/patterns';
import React, { FC } from 'react';

interface IProps {
  setAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
  succesfulAuthentication: boolean;
  isSubmitting: boolean;
  onCancel?: () => void;
  onSubmit: () => void;
}

export const KeypairStep: FC<IProps> = ({
  setAnimationFinished,
  succesfulAuthentication,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  return (
    <Layout
      title="Register Account"
      description={
        'Create your account to manage your web3 assets managed by your SpireKey wallet.'
      }
    >
      <PasskeyCard
        isInProgress={!succesfulAuthentication && isSubmitting}
        isSuccessful={succesfulAuthentication}
        onSuccessfulAnimationEnd={() => setAnimationFinished(true)}
        onSubmit={onSubmit}
      />
      <CardFooterGroup>
        <Button
          variant="outlined"
          onPress={onCancel}
          isDisabled={isSubmitting || succesfulAuthentication}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onPress={onSubmit}
          isDisabled={isSubmitting || succesfulAuthentication}
        >
          Continue
        </Button>
      </CardFooterGroup>
    </Layout>
  );
};
