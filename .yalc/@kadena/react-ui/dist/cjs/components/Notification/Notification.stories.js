"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Notification_1 = require("../Notification");
const _storyDecorators_1 = require("../../storyDecorators");
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const Notification_css_1 = require("./Notification.css");
const intentVariants = Object.keys((_b = (_a = Notification_css_1.notificationRecipe.classNames) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.intent);
const displayStyleVariant = Object.keys((_d = (_c = Notification_css_1.notificationRecipe.classNames) === null || _c === void 0 ? void 0 : _c.variants) === null || _d === void 0 ? void 0 : _d.displayStyle);
const meta = {
    title: 'Components/Notification',
    decorators: [_storyDecorators_1.withContentWidth],
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
exports.default = meta;
exports.Primary = {
    name: 'Notification',
    args: {
        heading: 'Notification Heading',
        isDismissable: true,
        intent: undefined,
        children: 'Notification children to inform users about the event that occurred!',
        displayStyle: 'bordered',
    },
    render: ({ heading, isDismissable, intent, children, displayStyle }) => {
        return (react_1.default.createElement(Notification_1.Notification, { intent: intent, isDismissable: isDismissable, onDismiss: () => {
                alert('Close button clicked');
            }, displayStyle: displayStyle, role: "none" },
            react_1.default.createElement(Notification_1.NotificationHeading, null, heading),
            children,
            react_1.default.createElement(Notification_1.NotificationFooter, null,
                react_1.default.createElement(Notification_1.NotificationButton, { intent: "positive", icon: react_1.default.createElement(__1.SystemIcon.Check, null) }, "Accept"),
                react_1.default.createElement(Notification_1.NotificationButton, { intent: "negative", icon: react_1.default.createElement(__1.SystemIcon.Close, null) }, "Reject"))));
    },
};
//# sourceMappingURL=Notification.stories.js.map