import { useNavigation } from '@/context/NavigationContext';
import {
  NavHeader,
  NavHeaderButton,
  NavHeaderLink,
  NavHeaderLinkList,
} from '@kadena/react-ui';
import { useEffect, useState } from 'react';
import { Dots } from '../icons/Dots';
import Brand from './Brand';
import ContextMenu from './ContextMenu';
import Drawer from './Drawer';
import * as styles from './Navigation.css';

export default function Navigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  const [contextMenuIsOpen, setContextMenuIsOpen] = useState<boolean>(false);
  const { contextMenuItems } = useNavigation();

  const drawerToggleHander = () => {
    setDrawerIsOpen((value) => !value);
  };

  const contextMenuToggleHandler = () => {
    setContextMenuIsOpen((value) => !value);
  };

  useEffect(() => {
    if (drawerIsOpen) {
      setContextMenuIsOpen(false);
    }
  }, [drawerIsOpen, setContextMenuIsOpen]);

  return (
    <>
      <NavHeader
        activeHref={window.location.pathname}
        logo={<Brand onDrawerToggle={drawerToggleHander} />}
      >
        <NavHeaderLinkList>
          <NavHeaderLink href="/" className={styles.link}>
            Accounts
          </NavHeaderLink>
          <NavHeaderLink href="/register" className={styles.link}>
            Register
          </NavHeaderLink>
          <NavHeaderLink href="/recover" className={styles.link}>
            Recover
          </NavHeaderLink>
        </NavHeaderLinkList>
        {!drawerIsOpen && contextMenuItems.length > 0 && (
          <NavHeaderButton icon={<Dots />} onPress={contextMenuToggleHandler} />
        )}
        <ContextMenu isOpen={contextMenuIsOpen} />
      </NavHeader>
      <Drawer isOpen={drawerIsOpen} />
    </>
  );
}
