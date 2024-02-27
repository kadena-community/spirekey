import { getTranslation } from '@/utils/translation';
import { Text } from '@kadena/react-ui';
import { ICap } from '@kadena/types';
import Image from 'next/image';

type Props = {
  translations: any;
  capability: ICap;
  type: 'granter' | 'acceptor';
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
}: Pick<Props, 'capability' | 'translations'>) => {
  const specific = getTranslation(translations, capability, 'acceptor');
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
}: Pick<Props, 'capability' | 'translations'>) => {
  const specific = getTranslation(translations, capability, 'granter');
  if (!specific) return <DefaultCapability capability={capability} />;
  return (
    <>
      <h3>{specific.title}</h3>
      <Image src={specific.image} alt={specific.title} width={24} height={24} />
      <Text>{specific.value}</Text>
    </>
  );
};

export const Capability = ({ translations, capability, type }: Props) => {
  console.log(translations, capability);
  if (!translations) return <DefaultCapability capability={capability} />;

  if (type === 'acceptor')
    return (
      <AcceptorCapability capability={capability} translations={translations} />
    );
  return (
    <GranterCapability capability={capability} translations={translations} />
  );
};
