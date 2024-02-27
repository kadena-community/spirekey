import { ICap } from '@kadena/types';

const formatValue = (value: any) => {
  if (value?.decimal)
    return value.decimal.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 12,
    });
  if (value?.int) return value.int;
  return value;
};

const getValue = (value: string, capability: ICap) =>
  value.replace(/{\d}/g, (plug: string) => {
    const index = Number(plug.replace(/{|}/g, ''));
    const value = formatValue(capability.args[index]);
    if (!value)
      throw new Error(
        `Can't load translations for capability: ${capability.name}`,
      );
    return value;
  });

export const getTranslation = (
  bundle: any,
  capability: ICap,
  type: 'default' | 'granter' | 'acceptor' = 'default',
) => {
  const { title, value, image, granter, acceptor } =
    bundle[capability.name] || {};
  if (!value && !granter && !acceptor) return null;

  if (type === 'acceptor')
    return {
      title,
      value: getValue(acceptor.value, capability),
      image: acceptor.image,
    };
  const granterValue = getValue(granter?.value || value, capability);
  return {
    title,
    value: granterValue,
    image: granter?.image || image,
  };
};
