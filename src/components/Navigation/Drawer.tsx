import {
  Box,
  NavHeader,
  NavHeaderLink,
  NavHeaderLinkList,
} from '@kadena/react-ui';
import { LogoIconWhite } from '../icons/LogoIconWhite';
import * as styles from './Drawer.css';

interface Props {
  isOpen: boolean;
}

export default function Drawer({ isOpen }: Props) {
  return (
    <Box
      className={styles.wrapper({
        variant: isOpen ? 'open' : 'default',
      })}
    >
      <Box
        className={styles.background({
          variant: isOpen ? 'open' : 'default',
        })}
      >
        <NavHeader
          activeHref={window.location.pathname}
          logo={<LogoIconWhite className={styles.icon} />}
          className={styles.nav}
        >
          <NavHeaderLinkList className={styles.linkList}>
            <NavHeaderLink href="/">Accounts</NavHeaderLink>
            <NavHeaderLink href="/register">Register</NavHeaderLink>
            <NavHeaderLink href="/recover">Recover</NavHeaderLink>
          </NavHeaderLinkList>
        </NavHeader>
      </Box>
    </Box>
  );
}
