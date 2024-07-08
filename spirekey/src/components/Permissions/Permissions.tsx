import {
  Avatar,
  Badge,
  Heading,
  MaskedValue,
  maskValue,
  Stack,
  Text,
} from '@kadena/kode-ui';
import { ICap } from '@kadena/types';
import { useEffect, useRef, useState } from 'react';
import * as styles from './Permissions.css';

export const Permission = ({ capability }: { capability: ICap }) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Get the current element from the ref
    const element = rowRef.current;

    // Add event listeners to the element
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    // Clean up event listeners on component unmount
    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      gap="md"
      className={styles.permission}
      ref={rowRef}
    >
      <Stack flexDirection="column">
        <Badge size="sm" style={isHovered ? 'highContrast' : 'default'}>
          {capability.name.replace(/^.*\./g, '')}
        </Badge>
      </Stack>

      <Stack flexDirection="column" textAlign="right">
        {capability.args.map((value: any, i) => (
          <CapabilityValue value={value} key={value + i.toString()} />
        ))}
      </Stack>
    </Stack>
  );
};

const CapabilityValue = ({ value }: { value: any }) => {
  if (value.length > 44) return <MaskedValue value={value} />;
  if (typeof value !== 'object') return <span>{value}</span>;
  if (value.int) return <span>{value.int}</span>;
  if (value.decimal) return <span>{value.decimal}</span>;
  return <span>{JSON.stringify(value)}</span>;
};

export const Permissions = ({
  module,
  capabilities,
}: {
  module: string;
  capabilities: ICap[];
}) => (
  <Stack className={styles.modulePermissionsGroup}>
    <Stack
      marginBlock="xs"
      flexDirection="row"
      className={styles.modulePermissionsHeader}
    >
      <Stack marginInlineEnd="sm">
        <Avatar name={capabilities.length.toString()} size="md" />
      </Stack>
      <Stack flexDirection="column">
        <Heading variant="h5">{module.replace(/^.*\./, '')}</Heading>
        <Text size="small" className={styles.walletNamespace}>
          {maskValue(module.replace(/\..*$/, ''))}
        </Text>
      </Stack>
    </Stack>
    <Stack marginBlock="md" flexDirection="column">
      {capabilities.map((capability: ICap) => (
        <Permission
          capability={capability}
          key={capability.name + capability.args.join(',')}
        />
      ))}
    </Stack>
  </Stack>
);
