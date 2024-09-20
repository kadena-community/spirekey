export const isLastSectionATab = (
  lastSection: string | undefined,
  whitelist?: string[],
): boolean => {
  return !!(lastSection && whitelist?.includes(lastSection));
};

export const removeLastSectionOfRoute = (
  route: string,
  whitelist?: string[],
): string => {
  const arr = route.split('/');
  const lastSection = arr.pop();

  if (whitelist && !isLastSectionATab(lastSection, whitelist)) return route;

  return arr.join('/');
};
