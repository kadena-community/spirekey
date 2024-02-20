export const hexadecimalToRGB = (color: string) => {
  const integerColor = parseInt(color.slice(1), 16);

  return {
    r: (integerColor >> 16) & 255,
    g: (integerColor >> 8) & 255,
    b: integerColor & 255,
  };
};
