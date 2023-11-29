"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dynamic = void 0;
const Icon_1 = require("../Icon");
const IconButton_1 = require("../IconButton");
const react_1 = __importDefault(require("react"));
const IconButton_css_1 = require("./IconButton.css");
const meta = {
    title: 'Components/IconButton',
    component: IconButton_1.IconButton,
    parameters: {
        status: {
            type: ['deprecated'],
        },
        docs: {
            description: {
                component: 'Use this variation of the Button component if you require a button with only an icon.',
            },
        },
    },
    argTypes: {
        onClick: {
            action: 'clicked',
            if: { arg: 'as', eq: 'button' },
            table: {
                disable: true,
            },
        },
        icon: {
            options: [
                ...['-'],
                ...Object.keys(Icon_1.SystemIcon),
            ],
            control: {
                type: 'select',
            },
            table: {
                type: { summary: Object.keys(Icon_1.SystemIcon).join(' | ') },
            },
        },
        title: {
            control: {
                type: 'text',
            },
            description: 'aria label',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },
        variant: {
            options: Object.keys(IconButton_css_1.typeVariants),
            control: {
                type: 'select',
            },
            description: 'button style variant',
            table: {
                type: { summary: Object.keys(IconButton_css_1.typeVariants).join(' | ') },
                defaultValue: { summary: 'compact' },
            },
        },
        color: {
            options: Object.keys(IconButton_css_1.colorVariants),
            control: {
                type: 'select',
            },
            description: 'color variant',
            table: {
                type: { summary: Object.keys(IconButton_css_1.colorVariants).join(' | ') },
                defaultValue: { summary: 'primary' },
            },
        },
        as: {
            description: 'render as button or anchor',
            options: ['button', 'a'],
            control: {
                type: 'radio',
            },
            table: {
                type: { summary: 'button | a' },
                defaultValue: { summary: 'button' },
            },
        },
        type: {
            description: 'type of button',
            options: ['button', 'submit', 'reset'],
            control: {
                type: 'select',
            },
            table: {
                type: { summary: 'button | submit | reset' },
                defaultValue: { summary: 'button' },
            },
            if: { arg: 'as', eq: 'button' },
        },
        href: {
            description: 'href is required when rendered as anchor',
            control: {
                type: 'text',
            },
            if: { arg: 'as', eq: 'a' },
        },
        target: {
            description: 'only used when rendered as anchor',
            options: ['_blank', '_self'],
            control: {
                type: 'radio',
            },
            if: { arg: 'as', eq: 'a' },
        },
        active: {
            description: 'set to apply active visual state',
            control: {
                type: 'boolean',
                defaultValue: { summary: false },
            },
        },
        asChild: {
            description: 'Allow users to pass on styles, icons, and additional props to the child component. For example when using next/link in Next.js.',
        },
    },
};
exports.default = meta;
exports.Dynamic = {
    name: 'IconButton',
    args: {
        active: false,
        as: 'button',
        color: 'primary',
        icon: 'Account',
        title: 'test title',
        type: 'button',
        variant: 'compact',
    },
    render: ({ active, as, color, icon, onClick, title, type, variant }) => {
        return (react_1.default.createElement(IconButton_1.IconButton, { active: active, as: as, color: color, icon: icon, onClick: onClick, title: title, type: type, variant: variant }));
    },
};
//# sourceMappingURL=IconButton.stories.js.map