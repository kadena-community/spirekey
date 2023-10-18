"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineWithButton = exports.Dynamic = void 0;
const Button_1 = require("../Button");
const Icon_1 = require("../Icon");
const Input_1 = require("../Input");
const Stack_1 = require("../Stack");
const vars_css_1 = require("../../styles/vars.css");
const react_1 = __importDefault(require("react"));
const HTMLInputTypes = [
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
];
const meta = {
    title: 'Form/Input',
    component: Input_1.Input,
    parameters: {
        docs: {
            description: {
                component: 'The Input component is a wrapper around the native input element that provides the ability to add additional information.',
            },
        },
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: HTMLInputTypes,
        },
        disabled: {
            description: 'Disables the input and applies visual styling.',
            control: {
                type: 'boolean',
            },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        leftIcon: {
            description: 'Icon rendered inside the input to the left of the input text.',
            options: [
                '-',
                ...Object.keys(Icon_1.SystemIcon),
            ],
            control: {
                type: 'select',
            },
        },
        rightIcon: {
            description: 'Icon rendered inside the input to the right of the input text.',
            options: [
                '-',
                ...Object.keys(Icon_1.SystemIcon),
            ],
            control: {
                type: 'select',
            },
        },
        leadingText: {
            description: 'Leading text that is rendered to the left of the input.',
            control: {
                type: 'text',
            },
        },
        leadingTextWidth: {
            description: 'Width of the leading text. Defaults to the size of the text itself.',
            control: {
                type: 'select',
            },
            options: [
                '- Omit this property to auto-size the leading text',
                ...Object.keys(vars_css_1.vars.sizes).map((key) => key),
            ],
        },
        outlined: {
            description: 'Option to render the input with an outline.',
            control: {
                type: 'boolean',
            },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
};
exports.default = meta;
exports.Dynamic = {
    name: 'Input',
    args: {
        leftIcon: undefined,
        type: 'text',
        rightIcon: undefined,
        leadingText: '',
        leadingTextWidth: undefined,
        outlined: false,
    },
    render: ({ leftIcon, rightIcon, outlined, leadingText, leadingTextWidth, onChange, disabled, type, }) => (react_1.default.createElement(Input_1.Input, { id: "inlineInputStory", leftIcon: leftIcon, rightIcon: rightIcon, onChange: onChange, placeholder: "This is a placeholder", leadingText: leadingText, leadingTextWidth: leadingTextWidth, outlined: outlined, disabled: disabled, type: type })),
};
exports.InlineWithButton = {
    name: 'Inline with button',
    args: {
        leftIcon: undefined,
        type: 'text',
    },
    render: ({ leftIcon, onChange, type }) => (react_1.default.createElement(Stack_1.Stack, { gap: "$xs", alignItems: "stretch" },
        react_1.default.createElement(Input_1.Input, { id: "inlineInputStory", leftIcon: leftIcon, onChange: onChange, placeholder: "This is a placeholder", outlined: true, type: type }),
        react_1.default.createElement(Button_1.Button, { title: "Submit", onClick: () => { } }, "Submit"))),
};
//# sourceMappingURL=Input.stories.js.map