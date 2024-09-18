import { IStepProps } from '@kadena/kode-ui';

export const createStatus = (
  step: number | undefined,
  idx: number,
): IStepProps['status'] => {
  if (step === undefined) return 'inactive';

  if (step === idx) return 'active';

  return 'inactive';
};
