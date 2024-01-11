import React from 'react';
import { colorVariants, transformVariants } from '../typography.css';
import { HEADING_ELEMENTS, Heading } from './Heading';
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
            options: HEADING_ELEMENTS,
            control: { type: 'select' },
        },
        variant: {
            options: HEADING_ELEMENTS,
            control: { type: 'select' },
        },
        bold: {
            options: HEADING_ELEMENTS,
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
        as: 'h1',
        children: 'heading',
        variant: undefined,
        bold: undefined,
        color: undefined,
        transform: undefined,
    },
    render: ({ as, bold, variant, transform, children, color }) => (React.createElement(Heading, { as: as, variant: variant, bold: bold, color: color, transform: transform }, children)),
};
//# sourceMappingURL=Heading.stories.js.map