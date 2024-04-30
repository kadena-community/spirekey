import { NavHeaderButton } from '@kadena/react-ui';
import { Hamburger } from '../icons/Hamburger';
import { LogoHorizontal } from '../icons/LogoHorizontal';
import * as styles from './Brand.css';

interface Props {
  onDrawerToggle: () => void;
}

export default function Brand({ onDrawerToggle }: Props) {
  return (
    <>
      <NavHeaderButton
        icon={<Hamburger />}
        className={styles.hamburger}
        onPress={onDrawerToggle}
      />
      <a href="/">
        <LogoHorizontal className={styles.logo} />
      </a>
    </>
  );
}
