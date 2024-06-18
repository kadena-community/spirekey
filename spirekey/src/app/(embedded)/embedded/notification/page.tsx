'use client';

import { MonoKeyboardArrowRight, MonoRemoveRedEye } from '@kadena/react-icons';
import { Heading } from '@kadena/react-ui';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import spireKeyLogo from '@/assets/images/SpireKey-logo-animated.svg';
import { SpireKeySpinner } from '@/components/Spinners/SpireKeySpinner';
import { publishEvent } from '@/utils/publishEvent';

import * as styles from './notification.css';

export default function SidebarSign() {
  const [title, setTitle] = useState<string | null>('In Progress');
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const getHash = () => {
      const params = new URLSearchParams(
        window.location.hash.replace(/^#/, '?'),
      );
      if (params.get('title')) {
        setTitle(params.get('title'));
      }
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
    publishEvent('toggle-notification');
    setIsMinimized(true);
  };

  const maximize = () => {
    publishEvent('toggle-notification');
    setIsMinimized(false);
  };

  const showSidebarNotifications = () => {
    publishEvent('toggle-sidebar-notifications');
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className={styles.wrapper}
        onClick={isMinimized ? maximize : () => {}}
      >
        <div>
          <Image
            src={spireKeyLogo}
            alt="SpireKey Logo"
            width={32}
            height={32}
          />
        </div>
        <div>
          <Heading>{title}</Heading>
        </div>
        <div>
          <MonoRemoveRedEye onClick={showSidebarNotifications} />
        </div>
        <div>
          <MonoKeyboardArrowRight onClick={minimize} />
        </div>
      </div>
    </div>
  );
}
