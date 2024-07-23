export const useRAccount = () => {
  const params = new URLSearchParams(location.hash || location.search);
  return (
    process.env.USE_RACCOUNT === 'true' || params.get('use-raccount') === 'true'
  );
};
