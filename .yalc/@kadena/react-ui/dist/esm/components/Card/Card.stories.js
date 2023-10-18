import { Button } from '../Button';
import { Card } from '../Card';
import React from 'react';
const meta = {
    title: 'Layout/Card',
    parameters: {
        docs: {
            description: {
                component: 'A component used for grouping items in a card.',
            },
        },
    },
    component: Card,
    argTypes: {
        stack: {
            control: {
                type: 'boolean',
            },
            description: 'If true, the component vertically stacks multiple card together and applies styles that combine them into a single card with separators.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        fullWidth: {
            control: {
                type: 'boolean',
            },
            description: 'An option to make the card span the full width of its container.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        disabled: {
            control: {
                type: 'boolean',
            },
            description: 'Disables the input and applies visual styling.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'Card',
    args: {
        stack: false,
        fullWidth: false,
        disabled: false,
    },
    render: ({ stack, fullWidth, disabled }) => {
        return (React.createElement(React.Fragment, null,
            React.createElement(Card, { stack: stack, fullWidth: fullWidth, disabled: disabled },
                React.createElement("h4", null, "Getting Started is Simple"),
                React.createElement("div", null, "Learn Kadena's core concepts & tools for development in 15 minutes"),
                React.createElement(Button, { title: 'Button' }, "Hello World Tutorial")),
            React.createElement(Card, { stack: stack, fullWidth: fullWidth, disabled: disabled },
                React.createElement("h4", null, "Getting Started is Simple"),
                React.createElement("div", null, "Learn Kadena's core concepts & tools for development in 15 minutes"),
                React.createElement(Button, { title: 'Button' }, "Hello World Tutorial"))));
    },
};
//# sourceMappingURL=Card.stories.js.map