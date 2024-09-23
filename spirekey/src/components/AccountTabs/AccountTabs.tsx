import { removeLastSectionOfRoute } from '@/utils/removeLastSectionOfRoute';
import { TabItem, Tabs } from '@kadena/kode-ui';
import { usePathname, useRouter } from 'next/navigation';

import React, { FC, PropsWithChildren } from 'react';
import { Key } from 'react-aria-components';

export const tabs = {
  root: {
    title: 'Overview',
  },
  transactions: {
    title: 'Transactions',
  },
  settings: {
    title: 'Settings',
  },
} as const;

interface IProps {
  selectedTabKey: keyof typeof tabs;
}

export const AccountTabs: FC<PropsWithChildren<IProps>> = ({
  selectedTabKey,
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelection = (value: Key) => {
    const route = removeLastSectionOfRoute(pathname, Object.keys(tabs));

    if (value === 'root') {
      router.push(`${route}`);
    } else {
      router.push(`${route}/${value}`);
    }
  };

  return (
    <Tabs
      onSelectionChange={handleSelection}
      isContained
      defaultSelectedKey={selectedTabKey}
    >
      {Object.entries(tabs).map(([key, value]) => (
        <TabItem key={key} title={value.title}>
          {key === selectedTabKey ? children : <></>}
        </TabItem>
      ))}
    </Tabs>
  );
};
