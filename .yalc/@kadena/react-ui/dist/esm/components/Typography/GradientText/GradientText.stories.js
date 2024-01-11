import { GradientText } from '../../Typography/GradientText/GradientText';
import React from 'react';
const meta = {
    title: 'Typography/GradientText',
    component: GradientText,
    parameters: {
        status: {
            type: ['deprecated'],
        },
    },
    argTypes: {
        children: {
            control: { type: 'text' },
        },
    },
};
export default meta;
export const Primary = {
    name: 'GradientText',
    args: {
        children: 'web3',
    },
    render: ({ children }) => React.createElement(GradientText, null, children),
};
//# sourceMappingURL=GradientText.stories.js.map