import { getCustomTranslation } from '@/utils/translation';
import { Box, Heading, Stack, Text } from '@kadena/react-ui';
import { ICap } from '@kadena/types';
import Image from 'next/image';
import { Surface } from '../Surface/Surface';
import { capabilityImage } from './Capability.css';

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

const TranslatedCapability = ({
  image,
  title,
  value,
}: {
  image: string;
  title: string;
  value: string;
}) => {
  return (
    <Stack marginBlock="sm" flexDirection="column">
      <Surface>
        <Stack alignItems="center" gap="md">
          <img className={capabilityImage} src={image} alt={title} />
          <Box marginBlockStart="xs" style={{ flexGrow: 1 }}>
            <Heading variant="h6" as="h4">
              {title}
            </Heading>
          </Box>
          <Heading
            variant="h6"
            as="h4"
            style={{ flexGrow: 1, textAlign: 'end' }}
          >
            {value}
          </Heading>
        </Stack>
      </Surface>
    </Stack>
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
    <TranslatedCapability
      title={specific.title}
      image={specific.image}
      value={specific.value}
    />
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
    <TranslatedCapability
      title={specific.title}
      image={specific.image}
      value={specific.value}
    />
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
