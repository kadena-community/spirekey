var _a, _b, _c, _d;
import { Notification, NotificationButton, NotificationFooter, NotificationHeading, } from '../Notification';
import { withContentWidth } from '../../storyDecorators';
import React from 'react';
import { SystemIcon } from '..';
import { notificationRecipe } from './Notification.css';
const intentVariants = Object.keys((_b = (_a = notificationRecipe.classNames) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.intent);
const displayStyleVariant = Object.keys((_d = (_c = notificationRecipe.classNames) === null || _c === void 0 ? void 0 : _c.variants) === null || _d === void 0 ? void 0 : _d.displayStyle);
const meta = {
    title: 'Components/Notification',
    decorators: [withContentWidth],
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'The Notification component renders a notification with an icon, heading, body, and action buttons. This component is used to announce dynamic changes in the content of a live region by asserting a discreet alert or notification. The appropriate role should be used to ensure that assistive technologies announce these dynamic changes. In the case where a user wants to use the Notification component purely for visual purposes, the role can be set to `none`.',
            },
        },
    },
    argTypes: {
        displayStyle: {
            options: displayStyleVariant,
            control: {
                type: 'select',
            },
            description: 'The Notification component has bordered and borderless variants. The borderless variant is used for notifications that located within a card or content body, while the bordered variant can be used in all other cases. ',
            table: {
                type: { summary: displayStyleVariant.join(' | ') },
                defaultValue: { summary: 'default' },
            },
        },
        intent: {
            options: intentVariants,
            control: {
                type: 'select',
            },
            description: 'Notification intent color',
            table: {
                type: { summary: intentVariants.join(' | ') },
                defaultValue: { summary: 'default' },
            },
        },
        isDismissable: {
            control: {
                type: 'boolean',
            },
        },
        children: {
            control: {
                type: 'text',
            },
        },
        role: {
            description: "The Notification component has a role attribute that can be set to 'alert', 'status', or 'none'.",
            options: ['alert', 'status', 'none'],
            control: {
                type: 'select',
            },
            table: {
                defaultValue: { summary: 'status' },
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'Notification',
    args: {
        heading: 'Notification Heading',
        isDismissable: true,
        intent: undefined,
        children: 'Notification children to inform users about the event that occurred!',
        displayStyle: 'bordered',
    },
    render: ({ heading, isDismissable, intent, children, displayStyle }) => {
        return (React.createElement(Notification, { intent: intent, isDismissable: isDismissable, onDismiss: () => {
                alert('Close button clicked');
            }, displayStyle: displayStyle, role: "none" },
            React.createElement(NotificationHeading, null, heading),
            children,
            React.createElement(NotificationFooter, null,
                React.createElement(NotificationButton, { intent: "positive", icon: React.createElement(SystemIcon.Check, null) }, "Accept"),
                React.createElement(NotificationButton, { intent: "negative", icon: React.createElement(SystemIcon.Close, null) }, "Reject"))));
    },
};
//# sourceMappingURL=Notification.stories.js.map