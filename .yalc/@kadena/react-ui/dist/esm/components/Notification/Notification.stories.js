import { SystemIcon } from '../Icon';
import { Notification } from '../Notification';
import React from 'react';
import { colorVariants, displayVariants } from './Notification.css';
const meta = {
    title: 'Components/Notification',
    parameters: {
        docs: {
            description: {
                component: 'The Notification component renders a notification with an icon, title, and text. The color variant of the notification can be set with the `color` prop.',
            },
        },
    },
    argTypes: {
        variant: {
            options: Object.keys(displayVariants),
            control: {
                type: 'select',
            },
        },
        icon: {
            options: Object.keys(SystemIcon),
            control: {
                type: 'select',
            },
        },
        title: {
            control: {
                type: 'text',
            },
        },
        color: {
            options: Object.keys(colorVariants),
            control: {
                type: 'select',
            },
        },
        expanded: {
            control: {
                type: 'boolean',
            },
        },
        hasCloseButton: {
            control: {
                type: 'boolean',
            },
        },
        inline: {
            control: {
                type: 'boolean',
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'Notification',
    args: {
        icon: 'Information',
        title: 'Notification title',
        hasCloseButton: true,
        expanded: false,
        color: undefined,
        text: 'Notification text to inform users about the event that occurred!',
        variant: 'standard',
        inline: false,
    },
    render: ({ icon, title, hasCloseButton, expanded, color, text, variant, inline, }) => {
        return (React.createElement(Notification.Root, { icon: icon, expanded: expanded, color: color, title: title, hasCloseButton: hasCloseButton, onClose: () => {
                alert('Close button clicked');
            }, variant: variant, inline: inline },
            text,
            React.createElement(Notification.Actions, null,
                React.createElement(Notification.Button, { icon: "Check", color: 'positive' }, "Accept"),
                React.createElement(Notification.Button, { icon: "Close", color: 'negative' }, "Reject"))));
    },
};
//# sourceMappingURL=Notification.stories.js.map