import { Fragment, useEffect, useState } from 'react';

import { KodeMono } from '@kadena/fonts';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import * as styles from './AccountRevealer.css';
import { charArray } from './characters';

KodeMono();

const ellipsis = (
  <>
    <span className={styles.character}>.</span>
    <span className={styles.character}>.</span>
    <span className={styles.character}>.</span>
  </>
);

interface AccountRevealerProps {
  accountName: string;
  reveal: boolean;
}

export const AccountRevealer = ({
  accountName,
  reveal,
}: AccountRevealerProps) => {
  const revealInterval = Math.floor(Math.random() * (600 - 200 + 1)) + 200;

  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const visibleStart = 4;
  const visibleEnd = 4;

  useEffect(() => {
    if (!accountName) return;

    const interval = setInterval(() => {
      if (
        (currentCharIndex === accountName?.length - 1 && !reveal) || // keep scrambling the last character in the case loading isn't done
        (currentCharIndex === accountName?.length && reveal)
      ) {
        clearInterval(interval);
        return;
      }

      setCurrentCharIndex((prev) => prev + 1);
    }, revealInterval);

    return () => clearInterval(interval);
  }, [revealInterval, currentCharIndex, accountName, reveal]);

  const randomChars = charArray
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .map((_, i) => (
      <span className={styles.character} key={i}>
        {charArray[i]}
      </span>
    ));

  if (!accountName) {
    return ellipsis;
  }

  if (reveal) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.wrapper}
      >
        {accountName.slice(0, 4)}
        {ellipsis}
        {accountName.slice(-4)}
      </motion.span>
    );
  }

  return (
    <span className={styles.wrapper} data-testid="accountNameRevealer">
      {accountName.split('').map((char, i) => {
        let content = null;

        if (currentCharIndex > i) {
          // If the current index is less than the visible start, show the actual character
          if (i < visibleStart) {
            content = char;
          }
          // If the current index is less than 8 and at the position after the visible characters, show ellipsis
          // Or if the current index is 8 or more and at the visible start, show ellipsis
          else if (
            (currentCharIndex < 8 && i === visibleStart + visibleEnd) ||
            (currentCharIndex >= 8 && i === visibleStart)
          ) {
            content = ellipsis;
          }
          // If the index is within the range of visible characters after the start, show the actual character
          else if (i >= visibleStart && currentCharIndex - visibleEnd < i) {
            content = char;
          }
          // If the index is at the position of the last visible characters and all characters have been iterated, show the actual character
          else if (
            i === accountName.length - visibleEnd &&
            currentCharIndex === accountName.length
          ) {
            content = char;
          }
        }
        // If the current index is equal to the current character index, show the scrambler
        else if (currentCharIndex === i) {
          content = (
            <span className={classNames(styles.character, styles.scrambler)}>
              <span className={styles.randomCharsWrapper}>
                <span className={styles.randomChars}>{randomChars}</span>
              </span>
            </span>
          );
        }

        // Return the content wrapped in a Fragment with a unique key
        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
  );
};
