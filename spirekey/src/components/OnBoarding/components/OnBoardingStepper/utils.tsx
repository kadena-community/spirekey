import { IStepProps } from '@kadena/kode-ui';

export const FLOWTYPE = {
  IMPORT: 'IMPORT',
  CREATE: 'CREATE',
} as const;

export const createStatus = (
  step: number | undefined,
  idx: number,
): IStepProps['status'] => {
  if (step !== undefined && idx <= step) return 'active';

  return 'inactive';
};
