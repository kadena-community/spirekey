import { useNavigation } from '@/context/NavigationContext';
import { Link, Stack } from '@kadena/react-ui';
import * as styles from './ContextMenu.css';

interface Props {
  isOpen: boolean;
}

export default function ContextMenu({ isOpen }: Props) {
  const { contextMenuItems } = useNavigation();

  return (
    <Stack
      flexDirection="column"
      alignItems="flex-end"
      paddingInline="md"
      paddingBlockEnd="md"
      className={styles.wrapper({
        variant: isOpen ? 'open' : 'default',
      })}
    >
      {contextMenuItems.map(({ href, text }) => (
        <Link href={href} key={text}>
          {text}
        </Link>
      ))}
    </Stack>
  );
}
