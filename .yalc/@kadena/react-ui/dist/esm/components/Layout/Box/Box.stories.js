import { Box } from '../../Layout/Box';
import { onLayer2 } from '../../../storyDecorators';
import React from 'react';
import { componentClass, containerClass, itemClass } from '../stories.css';
import { Legend, defaultBoxArgs, sharedStoryArgTypes, } from '../storyComponents';
const meta = {
    title: 'Layout/Box',
    component: Box,
    decorators: [onLayer2],
    parameters: {
        status: {
            type: 'stable',
        },
        docs: {
            description: {
                component: 'Box is the most basic building block of application layout.\n' +
                    '\nThis component accepts an `as` prop which allows the user to pass what html element the `Box` will render as well as many style attributes that are mapped to css utility classes.',
            },
        },
    },
    argTypes: sharedStoryArgTypes,
};
export default meta;
export const Primary = {
    name: 'Box - Margin',
    args: defaultBoxArgs,
    render: (props) => (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: containerClass },
            React.createElement(Box, { ...props, className: componentClass },
                React.createElement("div", { className: itemClass }, "Box Content"))),
        React.createElement(Legend, { items: [
                { label: 'Margin', color: 'warning' },
                { label: 'Padding', color: 'positive' },
                { label: 'Content', color: 'info' },
            ] }))),
};
//# sourceMappingURL=Box.stories.js.map