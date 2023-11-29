import { Breadcrumbs } from '../Breadcrumbs';
import { ProductIcon } from '../Icon';
import React from 'react';
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
                component: 'The Breadcrumb component displays the position of the current page within the site hierarchy, allowing page visitors to navigate the page hierarchy from their current location. It uses a composition of the `Root` and `Item` subcomponents to define the paths and structure of the entire breadcrumb component.<br><br><i>Note: In times when you need to use an external `Link` component (like next/link in Next.js), you can wrap the external component in `Breadcrumb.Item` and set the `asChild` prop to pass on styles and props to the child component.</i>',
            },
        },
    },
    argTypes: {
        icon: {
            description: 'The base icon for the breadcrumb component displayed to the left of the breadcrumb items.',
            options: Object.keys(ProductIcon),
            control: {
                type: 'select',
            },
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
        icon: 'KadenaOverview',
        itemsCount: 3,
    },
    render: ({ itemsCount, icon }) => {
        const items = ItemArray.slice(0, itemsCount);
        return (React.createElement(Breadcrumbs.Root, { icon: icon }, items.map((item, idx) => {
            return (React.createElement(Breadcrumbs.Item, { key: item, href: idx < items.length - 1 ? item : undefined }, item));
        })));
    },
};
//# sourceMappingURL=Breadcrumbs.stories.js.map