import { Heading } from '../../Typography/Heading/Heading';
import React from 'react';
import { colorVariants, fontVariants, transformVariants, } from '../typography.css';
import { boldVariants, elementVariants } from './Heading.css';
const meta = {
    title: 'Typography/Heading',
    component: Heading,
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
            options: Object.keys(elementVariants),
            control: { type: 'select' },
        },
        font: {
            options: Object.keys(fontVariants),
            control: { type: 'radio' },
        },
        bold: {
            options: Object.keys(boldVariants),
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
    name: 'Heading',
    args: {
        children: 'heading',
        as: 'h1',
        variant: undefined,
        font: undefined,
        bold: undefined,
        color: undefined,
        transform: undefined,
    },
    render: ({ font, bold, as, variant, transform, children, color }) => (React.createElement(Heading, { as: as, variant: variant, font: font, bold: bold, color: color, transform: transform }, children)),
};
//# sourceMappingURL=Heading.stories.js.map