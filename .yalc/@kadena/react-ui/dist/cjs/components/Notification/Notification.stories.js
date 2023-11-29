"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Notification_1 = require("../Notification");
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const Notification_css_1 = require("./Notification.css");
const meta = {
    title: 'Components/Notification',
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
        styleVariant: {
            description: 'The Notification component has bordered and borderless variants. The borderless variant is used for notifications that located within a card or content body, while the bordered variant can be used in all other cases. ',
            options: Object.keys(Notification_css_1.displayVariants),
            control: {
                type: 'select',
            },
            table: {
                defaultValue: { summary: 'bordered' },
            },
        },
        color: {
            options: Object.keys(Notification_css_1.colorVariants),
            control: {
                type: 'select',
            },
        },
        hasCloseButton: {
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
exports.default = meta;
exports.Primary = {
    name: 'Notification',
    args: {
        heading: 'Notification Heading',
        hasCloseButton: true,
        color: undefined,
        children: 'Notification children to inform users about the event that occurred!',
        styleVariant: 'bordered',
    },
    render: ({ heading, hasCloseButton, color, children, styleVariant }) => {
        return (react_1.default.createElement(Notification_1.Notification, { color: color, hasCloseButton: hasCloseButton, onClose: () => {
                alert('Close button clicked');
            }, styleVariant: styleVariant, role: "none" },
            react_1.default.createElement(Notification_1.NotificationHeading, null, heading),
            children,
            react_1.default.createElement(Notification_1.NotificationFooter, null,
                react_1.default.createElement(Notification_1.NotificationButton, { color: "positive" },
                    "Accept",
                    react_1.default.createElement(__1.SystemIcon.Check, null)),
                react_1.default.createElement(Notification_1.NotificationButton, { color: "negative" },
                    "Reject",
                    react_1.default.createElement(__1.SystemIcon.Close, null)))));
    },
};
//# sourceMappingURL=Notification.stories.js.map