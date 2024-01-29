import { useCallback, useEffect, useState } from 'react';

export const useReturnUrl = () => {
  const [host, setHost] = useState('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setHost(window.location.origin);
  }, []);
  const getReturnUrl = useCallback(
    (path: string) => {
      return host + path;
    },
    [host],
  );
  return {
    host,
    getReturnUrl,
  };
};
