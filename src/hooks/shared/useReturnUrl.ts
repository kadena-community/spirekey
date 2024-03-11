export const useReturnUrl = () => {
  const host = typeof window === 'undefined' ? '' : window.location.origin;
  const pathname =
    typeof window === 'undefined' ? '' : window.location.pathname;
  const getReturnUrl = (path: string = pathname) => {
    return host + path;
  };

  return {
    host,
    getReturnUrl,
  };
};
