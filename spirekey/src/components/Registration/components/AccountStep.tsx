import AccountNetwork from '@/components/Card/AccountNetwork';
import Alias from '@/components/Card/Alias';
import Card from '@/components/Card/Card';
import CardBottom from '@/components/Card/CardBottom';
import DeviceIcons from '@/components/Card/DeviceIcons';
import { Layout } from '@/components/OnBoarding/components/Layout/Layout';
import { OnBoardingStepper } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { deviceColors } from '@/styles/shared/tokens.css';
import { Button } from '@kadena/kode-ui';
import { CardFooterGroup } from '@kadena/kode-ui/patterns';
import { Account } from '@kadena/spirekey-types';
import React, { FC } from 'react';

interface IProps {
  account: Account;
  onCancel: () => void;
  onComplete: () => void;
}

export const AccountStep: FC<IProps> = ({ account, onCancel, onComplete }) => {
  return (
    <Layout
      title="Register Account"
      description={
        'Create your account to manage your web3 assets managed by your SpireKey wallet.'
      }
    >
      <OnBoardingStepper />
      <Card
        color={deviceColors.purple}
        balancePercentage={50}
        title={<Alias title={account.alias.replace(/\(.*\)/, '')} />}
        icons={<DeviceIcons account={account} />}
        center={<AccountNetwork account={account} isLoading={true} />}
        cardBottom={<CardBottom account={account} />}
      />
      <CardFooterGroup>
        <Button variant="outlined" onPress={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onPress={onComplete}>
          Complete
        </Button>
      </CardFooterGroup>
    </Layout>
  );
};
