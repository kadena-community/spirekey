import React from 'react';
import { ProductIcon } from '../Icon';
import { TrackerCard } from './TrackerCard';
import { layoutVariant } from './TrackerCard.css';
const meta = {
    title: 'Patterns/TrackerCard',
    parameters: {
        status: {
            type: ['experimental'],
        },
        docs: {
            description: {
                component: 'The TrackerCard component renders a card with a title, label values, and an optional icon. The layout of the card can be set to either horizonal or vertical with the `variant` prop.',
            },
        },
    },
    argTypes: {
        variant: {
            options: Object.keys(layoutVariant),
            control: {
                type: 'select',
            },
        },
        labelValues: {
            control: {
                type: 'object',
            },
        },
        helperText: {
            control: {
                type: 'text',
            },
        },
        helperTextType: {
            control: {
                type: 'select',
            },
            options: ['mild', 'severe'],
        },
        icon: {
            options: [
                undefined,
                ...Object.keys(ProductIcon),
            ],
            control: {
                type: 'select',
            },
        },
    },
};
export default meta;
const labelValues = [
    {
        label: 'Account Label',
        value: 'k:1234567890abcdef',
        isAccount: true,
    },
    {
        label: 'Balance',
        value: '1000',
    },
    {
        label: 'Transfer',
        value: '25',
    },
];
export const Primary = {
    name: 'TrackerCard',
    args: {
        labelValues: labelValues,
        helperText: 'This is a helper text',
        helperTextType: 'mild',
        icon: 'QuickStart',
        variant: 'vertical',
    },
    render: ({ labelValues, helperText, helperTextType, icon, variant }) => {
        return (React.createElement(TrackerCard, { variant: variant, labelValues: labelValues, helperText: helperText, helperTextType: helperTextType, icon: icon }));
    },
};
//# sourceMappingURL=TrackerCard.stories.js.map