export const getHostname = () => {
  const hostname = window.location.hostname;
  if (/kadena\.io/.test(hostname))
    return window.location.hostname.replace(/.*\.(\w+\.\w+)$/, '$1');
  return hostname;
};
