import React from 'react';
import { colorVariants, transformVariants } from '../typography.css';
import { Text } from './Text';
const meta = {
    title: 'Typography/Text',
    component: Text,
    parameters: {
        status: {
            type: ['needsRevision'],
        },
    },
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        as: {
            control: { type: 'select' },
        },
        variant: {
            options: ['small', 'smallest', 'base'],
            control: { type: 'select' },
        },
        bold: {
            control: { type: 'boolean' },
        },
        color: {
            options: Object.keys(colorVariants),
            control: { type: 'select' },
        },
        transform: {
            options: Object.keys(transformVariants),
            control: { type: 'radio' },
        },
    },
};
export default meta;
export const Primary = {
    name: 'Text',
    args: {
        children: 'text',
        as: 'span',
        variant: undefined,
        bold: undefined,
        color: undefined,
        transform: undefined,
    },
    render: ({ bold, as, variant, transform, children, color }) => (React.createElement(Text, { bold: bold, as: as, variant: variant, transform: transform, color: color }, children)),
};
//# sourceMappingURL=Text.stories.js.map