import { getCookie, setCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';

export const useFlag = (feature: string) => {
  const params = useSearchParams();

  const flag = params.get(feature);
  if ((!flag || flag === 'false' || flag === '0') && !getCookie(feature))
    return false;

  // keep cookie for a day
  setCookie(feature, 'true', {
    maxAge: 60 * 60 * 24,
  });

  return true;
};
