'use client';

import { MonoClose } from '@kadena/kode-icons/system';
import { Text } from '@kadena/kode-ui';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import SpireKeyLogoAnimated from '@/assets/images/chainweaver-logo-light-animated.svg';
import { publishEvent } from '@/utils/publishEvent';

import { useTxQueue } from '@/hooks/useTxQueue';
import { deviceColors } from '@/styles/shared/tokens.css';
import { hexadecimalToRGB } from '@/utils/color';
import { atoms } from '@kadena/kode-ui/styles';
import type { Account } from '@kadena/spirekey-types';
import * as styles from './notification.css';

export default function SidebarSign() {
  const [title, setTitle] = useState<string | null>('In Progress');
  const [isMinimized, setIsMinimized] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const { r, g, b } = hexadecimalToRGB(deviceColors.blue);

  const colorStart = `rgba(${r}, ${g}, ${b}, 0)`;
  const colorEnd = `rgba(${r}, ${g}, ${b}, 1)`;

  useTxQueue(accounts, (updatedAccounts) => {
    publishEvent('isReady', updatedAccounts);
  });

  useEffect(() => {
    const getHash = () => {
      const params = new URLSearchParams(
        window.location.hash.replace(/^#/, '?'),
      );
      if (params.get('title')) setTitle(params.get('title'));
      const accs = params.get('accounts');
      if (accs) setAccounts(JSON.parse(accs));
    };

    const onHashChanged = () => {
      getHash();
    };

    getHash();
    window.addEventListener('hashchange', onHashChanged);

    return () => {
      window.removeEventListener('hashchange', onHashChanged);
    };
  }, []);

  const minimize = () => {
    publishEvent('minimize-notification');
    setIsMinimized(true);
  };

  const maximize = () => {
    publishEvent('maximize-notification');
    setIsMinimized(false);
  };

  return (
    <div
      className={styles.wrapper}
      style={
        {
          '--card-progress': `50%`,
          '--card-progress-color-start': colorStart,
          '--card-progress-color-end': colorEnd,
        } as React.CSSProperties
      }
    >
      <button
        className={styles.notificationButton}
        onClick={isMinimized ? maximize : minimize}
        aria-label={
          isMinimized
            ? 'Show Spirekey Notification'
            : 'Hide Spirekey Notification'
        }
      >
        <object
          className={styles.spireKeyLoader}
          type="image/svg+xml"
          data={SpireKeyLogoAnimated.src}
        >
          svg-animation
        </object>
      </button>
      <Text bold color="emphasize" className={atoms({ flex: 1 })}>
        {title || ''}
      </Text>
      <button
        aria-label="Hide Spirekey Notification"
        className={styles.notificationButton}
        onClick={minimize}
      >
        <MonoClose />
      </button>
    </div>
  );
}
