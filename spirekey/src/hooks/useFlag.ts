import { useSearchParams } from 'next/navigation';

export const useFlag = (feature: string) => {
  const params = useSearchParams();
  const flag = params.get(feature);
  if (!flag) return false;
  if (flag === 'false') return false;
  if (flag === '0') return false;
  return true;
};
