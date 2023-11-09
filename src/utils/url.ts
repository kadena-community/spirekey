export const getReturnUrl = (path: string) => {
  return window.location.protocol + "//" + window.location.host + path;
};
