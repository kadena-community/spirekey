import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { getDeviceIcon } from '@/utils/getDeviceIcon';
import { Box, Grid, GridItem } from '@kadena/react-ui';
import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from './AddDevice';
import * as styles from './SigningDeviceForm.css';
import { animationVariants } from './animation';

export const SigningDeviceForm: FC<StepProps> = ({
  isVisible,
  defaultValues,
  updateFields,
  navigation,
  stepIndex,
  account,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      signingDeviceCredentialId: defaultValues.signingDeviceCredentialId,
    },
  });

  const selectedSigningDeviceCredentialId = watch('signingDeviceCredentialId');

  const onSubmit = (values: { signingDeviceCredentialId: string }) => {
    updateFields(values);
    navigation.next();
  };

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <form
        id={`add-device-form-${stepIndex}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SurfaceCard
          title="Signing device"
          description={
            <>
              Select a device that is already associated with this account to
              sign the transaction for adding this new device with.
              {errors.signingDeviceCredentialId && (
                <Box className={styles.errorText}>
                  {errors.signingDeviceCredentialId.message}
                </Box>
              )}
            </>
          }
        >
          <Grid gap="md" className={styles.wrapper}>
            {account.devices.map((device) => {
              const credentialId = device['credential-id'];
              return (
                <GridItem key={credentialId}>
                  <input
                    className={styles.input}
                    {...register('signingDeviceCredentialId', {
                      onChange: (event) => {
                        updateFields({
                          signingDeviceCredentialId: event.target.value,
                        });
                      },
                      required: 'Please select a device',
                    })}
                    type="radio"
                    value={credentialId}
                    id={`credential-id-${credentialId}`}
                  />
                  <label
                    htmlFor={`credential-id-${credentialId}`}
                    aria-label={credentialId}
                  >
                    <Box
                      className={classnames(
                        styles.device,
                        {
                          selected:
                            selectedSigningDeviceCredentialId === credentialId,
                        },
                        styles.backgroundColors[device.color],
                      )}
                    >
                      {getDeviceIcon(device.deviceType)}
                      {selectedSigningDeviceCredentialId === credentialId && (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1 }}
                            className={styles.selected}
                          />
                        </AnimatePresence>
                      )}
                    </Box>
                  </label>
                </GridItem>
              );
            })}
          </Grid>
        </SurfaceCard>
      </form>
    </motion.div>
  );
};
