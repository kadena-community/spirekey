"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Icon_1 = require("../Icon");
const Notification_1 = require("../Notification");
const react_1 = __importDefault(require("react"));
const Notification_css_1 = require("./Notification.css");
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
            options: Object.keys(Notification_css_1.displayVariants),
            control: {
                type: 'select',
            },
        },
        icon: {
            options: Object.keys(Icon_1.SystemIcon),
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
            options: Object.keys(Notification_css_1.colorVariants),
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
exports.default = meta;
exports.Primary = {
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
        return (react_1.default.createElement(Notification_1.Notification.Root, { icon: icon, expanded: expanded, color: color, title: title, hasCloseButton: hasCloseButton, onClose: () => {
                alert('Close button clicked');
            }, variant: variant, inline: inline },
            text,
            react_1.default.createElement(Notification_1.Notification.Actions, null,
                react_1.default.createElement(Notification_1.Notification.Button, { icon: "Check", color: 'positive' }, "Accept"),
                react_1.default.createElement(Notification_1.Notification.Button, { icon: "Close", color: 'negative' }, "Reject"))));
    },
};
//# sourceMappingURL=Notification.stories.js.map