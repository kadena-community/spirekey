import { Text } from '../../Typography/Text/Text';
import React from 'react';
import { colorVariant, elementVariant, fontVariant, sizeVariant, transformVariant, } from './Text.css';
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
            options: Object.keys(elementVariant),
            control: { type: 'select' },
        },
        size: {
            options: Object.keys(sizeVariant),
            control: { type: 'radio' },
        },
        font: {
            options: Object.keys(fontVariant),
            control: { type: 'radio' },
        },
        bold: {
            control: { type: 'boolean' },
        },
        color: {
            options: Object.keys(colorVariant),
            control: { type: 'select' },
        },
        transform: {
            options: Object.keys(transformVariant),
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
        size: undefined,
        font: undefined,
        bold: undefined,
        color: undefined,
        transform: undefined,
    },
    render: ({ font, bold, size, as, variant, transform, children, color }) => (React.createElement(Text, { font: font, bold: bold, size: size, as: as, variant: variant, transform: transform, color: color }, children)),
};
//# sourceMappingURL=Text.stories.js.map