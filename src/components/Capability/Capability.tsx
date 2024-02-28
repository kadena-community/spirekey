import { getCustomTranslation, getTranslation } from '@/utils/translation';
import { Text } from '@kadena/react-ui';
import { ICap } from '@kadena/types';
import Image from 'next/image';

type Props = {
  translations: any;
  capability: ICap;
  type: 'granter' | 'acceptor';
  metaData: any;
};

const DefaultCapability = ({ capability }: Pick<Props, 'capability'>) => {
  return (
    <>
      <h3>{capability.name}</h3>
      <Text>{capability.args.map((x) => JSON.stringify(x)).join(', ')}</Text>
    </>
  );
};

const AcceptorCapability = ({
  capability,
  translations,
  metaData,
}: Pick<Props, 'capability' | 'translations' | 'metaData'>) => {
  const specific = getCustomTranslation({
    bundle: translations,
    capability,
    metas: metaData,
    type: 'acceptor',
  });
  if (!specific) return <DefaultCapability capability={capability} />;
  return (
    <>
      <h3>{specific.title}</h3>
      <Image src={specific.image} alt={specific.title} width={24} height={24} />
      <Text>{specific.value}</Text>
    </>
  );
};

const GranterCapability = ({
  capability,
  translations,
  metaData,
}: Pick<Props, 'capability' | 'translations' | 'metaData'>) => {
  const specific = getCustomTranslation({
    bundle: translations,
    capability,
    metas: metaData,
    type: 'granter',
  });
  if (!specific) return <DefaultCapability capability={capability} />;
  return (
    <>
      <h3>{specific.title}</h3>
      <Image src={specific.image} alt={specific.title} width={24} height={24} />
      <Text>{specific.value}</Text>
    </>
  );
};

export const Capability = ({
  translations,
  capability,
  type,
  metaData,
}: Props) => {
  if (!translations) return <DefaultCapability capability={capability} />;

  if (type === 'acceptor')
    return (
      <AcceptorCapability
        capability={capability}
        translations={translations}
        metaData={metaData}
      />
    );
  return (
    <GranterCapability
      capability={capability}
      translations={translations}
      metaData={metaData}
    />
  );
};
