import { Stack } from '../Layout/Stack';
import { Pagination } from '../Pagination';
import React from 'react';
const meta = {
    title: 'Components/Pagination',
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'This is a navigation component that is used to visually represent and provide interaction elements for pagination. I provides previous and next buttons as well as a subset of the available pages closest to the selected page.<br><br><i>This component has a controlled and uncontrolled state. When a currentPage is not provided, the component will track state internally.</i>',
            },
        },
    },
    argTypes: {
        label: {
            control: {
                type: 'text',
            },
            description: 'Text that is passed to the Nav element as an aria-label for accessibility.',
            table: {
                type: { summary: 'string' },
            },
        },
        currentPage: {
            control: {
                type: 'number',
                min: 1,
                max: 20,
                step: 1,
            },
            description: 'Current page number. Used when component is controlled.',
            table: {
                type: { summary: 'number' },
            },
        },
        totalPages: {
            control: {
                type: 'number',
                min: 0,
                max: 20,
                step: 2,
            },
            description: 'Total number of pages.',
            table: {
                type: { summary: 'number' },
            },
        },
        visiblePageLimit: {
            control: {
                type: 'number',
                min: 3,
                max: 7,
                step: 1,
            },
            description: 'Number of pages that are visible and can be directly selected.',
            table: {
                type: { summary: 'number' },
            },
        },
        initialSelectedPage: {
            control: {
                type: 'number',
                min: 1,
                max: 20,
                step: 1,
            },
            description: 'The default selected page before any interaction.',
            table: {
                type: { summary: 'number' },
            },
        },
    },
};
export default meta;
export const Controlled = {
    args: {
        label: 'Pagination',
        totalPages: 10,
        visiblePageLimit: 3,
        initialSelectedPage: 2,
        currentPage: 2,
    },
    render: ({ totalPages, label, visiblePageLimit, initialSelectedPage, currentPage, }) => {
        return (React.createElement(Stack, { direction: "column", gap: "$4" },
            React.createElement(Pagination, { totalPages: totalPages, currentPage: currentPage, label: label, visiblePageLimit: visiblePageLimit, initialSelectedPage: initialSelectedPage, onPageChange: () => console.log('Updating Page') })));
    },
};
export const Uncontrolled = {
    args: {
        label: 'Label',
        totalPages: 10,
        visiblePageLimit: 3,
        initialSelectedPage: 2,
    },
    render: ({ totalPages, label, visiblePageLimit, initialSelectedPage }) => {
        return (React.createElement(Pagination, { totalPages: totalPages, label: label, visiblePageLimit: visiblePageLimit, initialSelectedPage: initialSelectedPage, onPageChange: () => console.log('Updating Page') }));
    },
};
//# sourceMappingURL=Pagination.stories.js.map