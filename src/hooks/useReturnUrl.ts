export const useReturnUrl = () => {
  const host = typeof window === 'undefined' ? '' : window.location.origin;

  const getReturnUrl = (path: string) => {
    return host + path;
  };

  return {
    host,
    getReturnUrl,
  };
};
