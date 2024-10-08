import { hash } from '@kadena/cryptography-utils';
import { ICap } from '@kadena/types';
import {
  CapabilityMeta,
  Meta,
  getAcceptorCapabilityMeta,
  getGranterCapabilityMeta,
} from './shared/smartContractMeta';

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
  type: 'granter' | 'acceptor',
) => {
  const { title, value, image, granter, acceptor } =
    bundle[capability.name] || {};
  if (!value && !granter && !acceptor) return null;

  if (type === 'acceptor')
    return {
      title: acceptor.title,
      value: getValue(acceptor.value, capability),
      image: acceptor.image,
    };
  const granterValue = getValue(granter?.value || value, capability);
  return {
    title: granter?.title || title,
    value: granterValue,
    image: granter?.image || image,
  };
};

export const getCustomTranslation = ({
  bundle,
  capability,
  metas,
  type,
}: {
  bundle: any;
  capability: ICap;
  metas: Meta[];
  type: 'granter' | 'acceptor';
}) => {
  // @ts-expect-error Type 'undefined' could be assigned
  const [capabilityMeta]: CapabilityMeta[] = metas
    .map((meta) => {
      if (type === 'acceptor')
        return getAcceptorCapabilityMeta(meta, capability.name);
      return getGranterCapabilityMeta(meta, capability.name);
    })
    .filter(Boolean);

  if (!capabilityMeta) return getTranslation(bundle, capability, type);
  // intentional == I want to check if null or undefined
  if (
    capabilityMeta.hashIndex == null ||
    !Array.isArray(capabilityMeta.hashValues)
  )
    return getTranslation(bundle, capability, type);
  // merge bundle with entry for specific cap from custom bundle
  // then call getTranslation with merged bundle
  const customTranslation = getCustomCapabilityTranslation({
    capability,
    capabilityMeta,
    bundle,
  });
  if (!customTranslation) return getTranslation(bundle, capability, type);

  // TODO: Add back hash after capabilities have been simplified
  // if (capability.args[capabilityMeta.hashIndex] !== customTranslation.hash)
  //   throw new Error(
  //     'The translations have been tampered with, please be careful!',
  //   );
  const mergedBundle = {
    ...bundle,
    [capability.name]: customTranslation.translation,
  };
  return getTranslation(mergedBundle, capability, type);
};

const getCustomCapabilityTranslation = ({
  capability,
  capabilityMeta,
  bundle,
}: {
  capabilityMeta: CapabilityMeta;
  bundle: any;
  capability: ICap;
}) => {
  if (!capabilityMeta.hashValues) return null;
  const capValues = capabilityMeta.hashValues
    .map((value) => capability.args[value])
    .map((v) => JSON.stringify(v));
  const customTranslation =
    bundle[`${capability.name}(${capValues.join(',')})`];
  if (!customTranslation) return null;
  return {
    hash: hash([...capValues, JSON.stringify(customTranslation)].join(',')),
    translation: customTranslation,
  };
};
