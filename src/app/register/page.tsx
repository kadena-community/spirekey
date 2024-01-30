'use client';

import { Button } from '@/components/Button/Button';
import DeviceCard from '@/components/Card/DeviceCard';
import { Surface } from '@/components/Surface/Surface';
import { useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getAccountName, registerAccount } from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { Box, Stack } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { container, wrapper } from './page.css';
import { Alias } from './steps/Alias';
import { Color } from './steps/Color';
import { DeviceType } from './steps/DeviceType';
import { Network } from './steps/Network';

const TOTAL_STEPS = 4;
const FORM_DEFAULT = {
  networkId: '',
  alias: '',
  deviceType: '',
  color: '',
  credentialPubkey: '',
  credentialId: '',
  accountName: '',
};

type FormValues = typeof FORM_DEFAULT;

export default function Account() {
  const formMethods = useForm({ defaultValues: FORM_DEFAULT });

  const [currentStep, setCurrentStep] = useState(1);
  const prevStep = currentStep > 1 ? currentStep - 1 : null;
  const nextStep = currentStep < TOTAL_STEPS ? currentStep + 1 : null;

  const { storeAccount } = useAccounts();
  const { host } = useReturnUrl();

  const goToNextStep = () => {
    if (!nextStep) return;
    if (nextStep === 3) {
      return onChangeAlias().then(() => setCurrentStep(nextStep));
    }

    setCurrentStep(nextStep);
  };

  const onChangeAlias = async () => {
    const { credentialId, publicKey } = await getNewWebauthnKey(
      formMethods.getValues('alias'),
    );
    formMethods.setValue('credentialId', credentialId);
    formMethods.setValue('credentialPubkey', publicKey);
    const accountName = await getAccountName(publicKey);
    formMethods.setValue('accountName', accountName);
  };

  const goToPrevStep = () => {
    if (!prevStep) return;
    setCurrentStep(prevStep);
  };

  const onSubmit = async (data: FormValues) => {
    const caccount = await registerAccount({
      credentialPubkey: formMethods.getValues('credentialPubkey'),
      credentialId: formMethods.getValues('credentialId'),
      displayName: `${data.deviceType}_${data.color}`,
      domain: host,
    });

    storeAccount({ accountName: caccount, alias: data.alias, network: host });
  };

  return (
    <Stack flexDirection="column" gap="md" padding="lg">
      <Box width="100%">
        <DeviceCard
          account={{
            alias: formMethods.watch('alias'),
            accountName: formMethods.watch('accountName'),
            balance: '0.0',
            network: formMethods.watch('networkId'),
            devices: [
              {
                'credential-id': formMethods.watch('credentialId'),
                domain: host,
                color: formMethods.watch('color'),
                deviceType: formMethods.watch('deviceType'),
                guard: {
                  keys: [formMethods.watch('credentialPubkey')],
                  pred: 'keys-any',
                },
              },
            ],
          }}
        />
      </Box>

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className={wrapper}>
            <motion.div
              animate={{ x: `-${(currentStep - 1) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className={container}
            >
              <Surface>
                <Network isVisible={currentStep === 1} />
              </Surface>

              <Surface>
                <Alias isVisible={currentStep === 2} />
              </Surface>

              <Surface>
                <DeviceType isVisible={currentStep === 3} />
              </Surface>

              <Surface>
                <Color isVisible={currentStep === 4} />
              </Surface>
            </motion.div>
          </div>

          <div
            className={atoms({ display: 'flex', marginBlock: 'lg', gap: 'xl' })}
          >
            <Button
              variant="secondary"
              onPress={goToPrevStep}
              className={atoms({ flex: 1 })}
            >
              {!prevStep ? 'Cancel' : 'Previous'}
            </Button>

            <Button
              onPress={goToNextStep}
              variant="progress"
              progress={(currentStep / TOTAL_STEPS) * 100}
              className={atoms({ flex: 1 })}
              type={nextStep ? 'button' : 'submit'}
            >
              {nextStep ? 'Next' : 'Complete'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Stack>
  );
}
