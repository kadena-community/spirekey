import { ProductIcon } from '../Icon';
import React from 'react';
import { BreadcrumbsContainer } from './Breadcrumbs';
import { BreadcrumbsItem } from './BreadcrumbsItem';
const ItemArray = [
    'He-man',
    'Skeletor',
    'Orko',
    'Teela-Na',
    'Cringer',
    'King Randor',
];
const meta = {
    title: 'Navigation/Breadcrumbs',
    parameters: {
        status: { type: 'needsRevision' },
        docs: {
            description: {
                component: 'The Breadcrumb component displays the position of the current page within the site hierarchy, allowing page visitors to navigate the page hierarchy from their current location. It is composed by BreadcrumbsContainer and BreadcrumbsItem.<br><br><i>Note: In times when you need to use an external `Link` component (like next/link in Next.js), you can wrap the external component in BreadcrumbsItem and set the `asChild` prop to pass on styles and props to the child component.</i>',
            },
        },
    },
    argTypes: {
        icon: {
            description: 'The base icon for the breadcrumb component displayed to the left of the breadcrumb items. is part of the ProductIcon',
        },
        itemsCount: {
            control: { type: 'range', min: 1, max: 6, step: 1 },
        },
    },
};
export default meta;
export const Primary = {
    name: 'Breadcrumbs',
    args: {
        icon: React.createElement(ProductIcon.KadenaOverview, null),
        itemsCount: 3,
    },
    render: ({ itemsCount, icon }) => {
        const items = ItemArray.slice(0, itemsCount);
        return (React.createElement(BreadcrumbsContainer, { icon: icon }, items.map((item, idx) => {
            return (React.createElement(BreadcrumbsItem, { key: item, href: idx < items.length - 1 ? item : undefined }, item));
        })));
    },
};
//# sourceMappingURL=Breadcrumbs.stories.js.map