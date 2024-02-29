import { getCustomTranslation } from '@/utils/translation';
import { Box, Heading, Stack, Text } from '@kadena/react-ui';
import { ICap } from '@kadena/types';
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
  const valueNumber = Number(value);
  const isNumber = !isNaN(valueNumber);
  return (
    <Stack
      alignItems="flex-start"
      gap="md"
      justifyContent={isNumber ? 'space-between' : 'flex-start'}
    >
      <img className={capabilityImage} src={image} alt={title} />
      <Box marginBlockStart="xs">
        <Heading variant="h6" as="h4">
          {title}
        </Heading>
        {!isNumber && <Text style={{ wordBreak: 'break-all' }}>{value}</Text>}
      </Box>
      {isNumber && (
        <Box marginBlockStart="xs" flexGrow={1} textAlign="right">
          <Text color="emphasize" bold>
            {valueNumber.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 12,
            })}
          </Text>
        </Box>
      )}
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
