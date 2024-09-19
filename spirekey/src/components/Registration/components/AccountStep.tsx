import AccountNetwork from '@/components/Card/AccountNetwork';
import Alias from '@/components/Card/Alias';
import Card from '@/components/Card/Card';
import CardBalance from '@/components/Card/CardBalance';
import DeviceIcons from '@/components/Card/DeviceIcons';
import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { LayoutActions } from '@/components/OnBoarding/components/Layout/LayoutActions';
import { LayoutContext } from '@/components/OnBoarding/components/Layout/LayoutContext';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { deviceColors } from '@/styles/shared/tokens.css';
import { Button, Stack } from '@kadena/kode-ui';
import { Account } from '@kadena/spirekey-types';
import React, { FC } from 'react';
import { passkeyWrapperClass } from './styles.css';

interface IProps {
  account: Account;
  onCancel: () => void;
  onComplete: () => void;
  steps: string[];
}

export const AccountStep: FC<IProps> = ({
  account,
  onCancel,
  onComplete,
  steps,
}) => {
  return (
    <Layout
      title="Register Account"
      description={
        'Create your account to manage your web3 assets managed by your SpireKey wallet.'
      }
    >
      <OnBoardingStepper step={1} steps={steps} />
      <LayoutContext>
        <Stack className={passkeyWrapperClass}>
          <Card
            color={deviceColors.purple}
            balancePercentage={50}
            title={<Alias title={account.alias.replace(/\(.*\)/, '')} />}
            icons={<DeviceIcons account={account} />}
            center={<AccountNetwork account={account} isLoading={true} />}
            cardBalance={<CardBalance account={account} />}
          />
        </Stack>
      </LayoutContext>
      <LayoutActions>
        <Button variant="outlined" onPress={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onPress={onComplete}>
          Complete
        </Button>
      </LayoutActions>
    </Layout>
  );
};
