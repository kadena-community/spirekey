'use client';

import { MonoLastPage, MonoRemoveRedEye } from '@kadena/kode-icons/system';
import { Heading, useTheme } from '@kadena/kode-ui';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import spireKeyLogo from '@/assets/images/spireKey-logo-animated.svg';
import { publishEvent } from '@/utils/publishEvent';

import { useTxQueue } from '@/hooks/useTxQueue';
import { deviceColors } from '@/styles/shared/tokens.css';
import { hexadecimalToRGB } from '@/utils/color';
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

  const showSidebarNotifications = () => {
    publishEvent('show-notifications-sidebar');
  };

  useTheme({ lockedTheme: 'light' });

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className={styles.wrapper}
        onClick={isMinimized ? maximize : () => {}}
        style={
          {
            '--card-progress': `50%`,
            '--card-progress-color-start': colorStart,
            '--card-progress-color-end': colorEnd,
          } as React.CSSProperties
        }
      >
        <Image
          className={styles.spireKeyLoader}
          src={spireKeyLogo}
          alt="SpireKey Logo"
          width={64}
          height={64}
        />
        <Heading className={styles.title} variant="h4">
          {title}
        </Heading>
        <MonoRemoveRedEye onClick={showSidebarNotifications} />
        <MonoLastPage onClick={minimize} />
      </div>
    </div>
  );
}
