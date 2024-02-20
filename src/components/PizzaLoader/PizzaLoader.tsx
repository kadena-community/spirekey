import { FC } from 'react';

import * as styles from './PizzaLoader.css';
export const PizzaLoader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.slice}>
        <div className={styles.sliceTomato}></div>
        <div className={styles.sliceTomato}></div>
      </div>
      <div className={styles.slice}>
        <div className={styles.sliceTomato}></div>
        <div className={styles.sliceTomato}></div>
      </div>
      <div className={styles.slice}>
        <div className={styles.sliceTomato}></div>
        <div className={styles.sliceTomato}></div>
      </div>
      <div className={styles.slice}>
        <div className={styles.sliceTomato}></div>
        <div className={styles.sliceTomato}></div>
      </div>
      <div className={styles.slice}>
        <div className={styles.sliceTomato}></div>
        <div className={styles.sliceTomato}></div>
      </div>
      <div className={styles.slice}>
        <div className={styles.sliceTomato}></div>
        <div className={styles.sliceTomato}></div>
      </div>
    </div>
  );
};
