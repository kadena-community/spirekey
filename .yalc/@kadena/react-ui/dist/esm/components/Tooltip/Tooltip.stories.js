import { Button } from '../Button';
import { SystemIcon } from '../Icon';
import { Stack } from '../Layout';
import { Tooltip } from '../Tooltip';
import { onLayer1 } from '../../storyDecorators';
import { atoms } from '../../styles/atoms.css';
import React from 'react';
const meta = {
    title: 'Overlays/Tooltip',
    component: Tooltip,
    decorators: [onLayer1],
    parameters: {
        status: {
            type: ['releaseCandidate'],
        },
        docs: {
            description: {
                component: 'The Tooltip component renders a tooltip with content when the user hovers or focuses the element passed as children.',
            },
        },
    },
    argTypes: {
        content: {
            description: 'The content that will be rendered inside the tooltip. This can be a string or a ReactNode.',
            control: {
                type: 'text',
            },
        },
        position: {
            description: 'The position of the tooltip relative to the element that triggers it.',
            table: {
                defaultValue: { summary: 'right' },
            },
        },
        delay: {
            description: 'The delay in milliseconds before the tooltip is shown when the user hovers or focuses the element.',
            table: {
                defaultValue: { summary: 500 },
            },
        },
        closeDelay: {
            description: 'The delay in milliseconds before the tooltip is hidden when the user stops hovering or focusing the element.',
            table: {
                defaultValue: { summary: 300 },
            },
        },
        isDisabled: {
            description: 'Disables the tooltip when set to true.',
            table: {
                defaultValue: { summary: false },
            },
        },
        isOpen: {
            description: 'Allows the user to control the open state of the tooltip.',
            table: {
                defaultValue: { summary: false },
            },
        },
        defaultOpen: {
            description: 'Sets the initial open state of the tooltip.',
            table: {
                defaultValue: { summary: false },
            },
        },
    },
};
export default meta;
export const Dynamic = {
    name: 'Tooltip with Text',
    args: {
        content: "I'm a tooltip, look at me!",
        position: 'right',
        isDisabled: false,
        delay: 500,
        closeDelay: 300,
    },
    render: ({ content, position, isDisabled, delay, closeDelay }) => {
        return (React.createElement(Tooltip, { content: content, position: position, isDisabled: isDisabled, delay: delay, closeDelay: closeDelay },
            React.createElement(Button, null, "Trigger")));
    },
};
export const TooltipReactNode = {
    name: 'Tooltip with components',
    args: {
        position: 'right',
        isDisabled: false,
        delay: 500,
        closeDelay: 300,
    },
    render: ({ position, isDisabled, delay, closeDelay }) => {
        return (React.createElement(Tooltip, { position: position, isDisabled: isDisabled, delay: delay, closeDelay: closeDelay, content: React.createElement(Stack, { flexDirection: "row", gap: "xs", alignItems: "center" },
                React.createElement(SystemIcon.AlertBox, null),
                React.createElement("code", null, "I have an icon!")) },
            React.createElement(Button, null, "Trigger")));
    },
};
export const DefaultOpen = {
    name: 'Tooltip that is set to defaultOpen',
    args: {
        content: "I'm a tooltip, look at me!",
        position: 'right',
        isDisabled: false,
        delay: 500,
        closeDelay: 300,
    },
    render: ({ content, position, isDisabled, delay, closeDelay }) => {
        return (React.createElement(Tooltip, { content: content, position: position, isDisabled: isDisabled, delay: delay, closeDelay: closeDelay, defaultOpen: true },
            React.createElement(Button, null, "Trigger")));
    },
};
export const Controlled = {
    name: 'Tooltip that is controlled by a button',
    args: {
        content: "I'm a tooltip, look at me!",
        position: 'right',
        isDisabled: false,
        delay: 500,
        closeDelay: 300,
    },
    render: ({ content, position, isDisabled, delay, closeDelay }) => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: atoms({ marginBlockEnd: 'xxxl' }) },
                React.createElement(Button, { onClick: () => setIsOpen(!isOpen) }, isOpen ? 'Hide Tooltip' : 'Show Tooltip')),
            React.createElement(Tooltip, { content: content, position: position, isDisabled: isDisabled, delay: delay, closeDelay: closeDelay, isOpen: isOpen },
                React.createElement(SystemIcon.AlertBox, null))));
    },
};
//# sourceMappingURL=Tooltip.stories.js.map