import { FC, ReactNode } from 'react';
import * as styles from './Container.css';

interface Props {
  children: ReactNode;
}

export const Container: FC<Props> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
