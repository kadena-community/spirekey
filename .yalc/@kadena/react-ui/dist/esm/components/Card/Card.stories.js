import { Button } from '../Button';
import { Card } from '../Card';
import { Stack } from '../Layout';
import { Heading, Text } from '../Typography';
import React from 'react';
const meta = {
    title: 'Layout/Card',
    parameters: {
        status: {
            type: ['needsRevision'],
        },
        docs: {
            description: {
                component: 'A component used for grouping items in a card.',
            },
        },
    },
    component: Card,
    argTypes: {
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
        fullWidth: false,
        disabled: false,
    },
    render: ({ fullWidth, disabled }) => {
        return (React.createElement(React.Fragment, null,
            React.createElement(Card, { fullWidth: fullWidth, disabled: disabled },
                React.createElement(Stack, { direction: "column", gap: "$2", alignItems: "flex-start", marginBottom: "$6", maxWidth: "$maxContentWidth" },
                    React.createElement(Heading, { as: "h5" }, "Intro to Kadena"),
                    React.createElement(Text, null, "Kadena is the only platform offering a complete decentralized infrastructure for builders. Combining a revolutionary chain architecture with the tools needed for widespread adoption, your teams get the full capabilities of blockchain with the ability to go from concept to launch in days vs. months by not having to build from scratch. Learn about our core concepts.")),
                React.createElement(Button, { title: 'Button' }, "Kadena Docs"))));
    },
};
//# sourceMappingURL=Card.stories.js.map