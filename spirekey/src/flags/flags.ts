import { unstable_flag as flag } from '@vercel/flags/next';

export const useRAccount = flag({
  key: 'r-account',
  decide: () => process.env.USE_RACCOUNT === 'true',
});
