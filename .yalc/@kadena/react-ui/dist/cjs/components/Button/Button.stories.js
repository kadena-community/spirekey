"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dynamic = void 0;
const Icon_1 = require("../Icon");
const withCenteredStory_1 = require("../../utils/withCenteredStory");
const react_1 = __importDefault(require("react"));
const Button_1 = require("./Button");
const Button_css_1 = require("./Button.css");
const meta = {
    title: 'Components/Button',
    component: Button_1.Button,
    decorators: [withCenteredStory_1.withCenteredStory],
    parameters: {
        status: { type: 'inDevelopment' },
        controls: {
            hideNoControlsWarning: true,
            sort: 'requiredFirst',
        },
        docs: {
            description: {
                component: 'The Button component renders a clickable element that can either be a button or anchor which will be styled according to the variant prop (`primary` being the default).<br /><br />The Button component can include an icon<sup>*</sup> which can be aligned either left or right (default: `right`).<br /><br /><em><sup>*</sup> Please use IconButton when you require a button with only an icon.</em>',
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
            if: { arg: 'loading', eq: false },
        },
        iconAlign: {
            description: 'align icon to left or right',
            options: ['left', 'right'],
            control: {
                type: 'radio',
            },
            table: {
                type: { summary: 'left | right' },
                defaultValue: { summary: 'right' },
            },
            if: { arg: 'icon', neq: '-' },
        },
        color: {
            options: Object.keys(Button_css_1.colorVariants),
            control: {
                type: 'select',
            },
            description: 'color variant',
            table: {
                type: { summary: Object.keys(Button_css_1.colorVariants).join(' | ') },
                defaultValue: { summary: 'primary' },
            },
        },
        variant: {
            options: Object.keys(Button_css_1.typeVariants),
            control: {
                type: 'select',
            },
            description: 'button style variant',
            table: {
                type: { summary: Object.keys(Button_css_1.typeVariants).join(' | ') },
                defaultValue: { summary: 'default' },
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
        text: {
            description: 'label text',
            control: {
                type: 'text',
            },
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
        disabled: {
            description: 'only used when rendered as button',
            control: {
                type: 'boolean',
            },
            if: { arg: 'as', eq: 'button' },
        },
        loading: {
            description: 'loading state',
            control: {
                type: 'boolean',
            },
            if: { arg: 'as', eq: 'button' },
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
exports.Dynamic = {
    name: 'Button',
    args: {
        active: false,
        as: 'button',
        color: 'primary',
        disabled: false,
        href: 'https://kadena.io',
        icon: undefined,
        iconAlign: 'right',
        loading: false,
        target: '_self',
        text: 'Click me',
        title: 'test title',
        variant: 'default',
    },
    render: ({ active, as, color = 'primary', disabled, href, icon, iconAlign = 'right', loading, onClick, target, text, title, variant = 'default', }) => {
        if (loading) {
            icon = 'Loading';
        }
        return (react_1.default.createElement(Button_1.Button, { active: active, as: as, color: color, disabled: disabled, href: href, icon: icon, iconAlign: iconAlign, loading: loading, onClick: onClick, target: target, title: title, variant: variant }, text));
    },
};
exports.default = meta;
//# sourceMappingURL=Button.stories.js.map