//whitelist could include undefined
export const isStringInArray = (
  lastSection: string | undefined,
  whitelist?: string[],
): boolean => {
  return !!(lastSection !== undefined && whitelist?.includes(lastSection));
};

export const removeLastSectionOfRoute = (
  route: string,
  whitelist?: string[],
): string => {
  const arr = route.split('/');
  const lastSection = arr.pop();

  if (whitelist && !isStringInArray(lastSection, whitelist)) return route;

  return arr.join('/');
};
