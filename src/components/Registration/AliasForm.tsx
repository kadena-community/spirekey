import { TextField } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SurfaceCard } from '../SurfaceCard/SurfaceCard';
import { StepProps } from './Registration';
import { animationVariants } from './animation';

export function AliasForm({
  isVisible,
  updateFields,
  stepIndex,
  navigation,
}: StepProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { alias: '' },
  });

  const aliasRef = useRef<HTMLInputElement>(null);
  const { ref, ...fieldProps } = register('alias', {
    required: 'Please enter an alias for your account',
    maxLength: {
      value: 40,
      message: 'Alias must be less than 40 characters',
    },
    onChange(event) {
      updateFields({ alias: event.target.value });
    },
  });

  useImperativeHandle(ref, () => aliasRef.current);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        aliasRef.current?.focus();
      }, 700);
    }
  }, [isVisible]);

  const onSubmit = (values: { alias: string }) => {
    updateFields(values);
    navigation.next();
  };

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <form
        id={`registration-form-${stepIndex}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SurfaceCard
          title="Alias"
          description="This alias helps you to identify this account. The alias is only stored
        on your device and cannot been seen by others."
        >
          <TextField
            id="alias"
            placeholder="Your alias"
            aria-placeholder="Your alias"
            aria-label="Your alias"
            {...fieldProps}
            ref={aliasRef}
            isInvalid={!!errors.alias}
            errorMessage={errors.alias?.message}
          />
        </SurfaceCard>
      </form>
    </motion.div>
  );
}
