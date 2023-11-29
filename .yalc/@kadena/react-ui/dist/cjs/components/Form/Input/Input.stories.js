"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineWithButton = exports.Dynamic = void 0;
const Button_1 = require("../../Button");
const Form_1 = require("../../Form");
const Icon_1 = require("../../Icon");
const Stack_1 = require("../../Layout/Stack");
const vars_css_1 = require("../../../styles/vars.css");
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
    title: 'Form/Input/Input',
    component: Form_1.Input,
    parameters: {
        status: { type: 'inDevelopment' },
        docs: {
            description: {
                component: 'The Input component is a wrapper around the native input element that provides the ability to add additional information. This handles any kind of children that will be rendered inside the input on the right side of it.',
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
        icon: {
            description: 'Icon rendered inside the input to the left of the input text.',
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
        icon: undefined,
        type: 'text',
        leadingTextWidth: undefined,
        leadingText: '',
        outlined: false,
    },
    render: ({ icon, outlined, leadingText, leadingTextWidth, onChange, disabled, type, }) => (react_1.default.createElement(Form_1.Input, { id: "inlineInputStory", icon: icon, onChange: onChange, placeholder: "This is a placeholder", leadingTextWidth: leadingTextWidth, leadingText: leadingText, outlined: outlined, disabled: disabled, type: type })),
};
exports.InlineWithButton = {
    name: 'Inline with button',
    args: {
        icon: undefined,
        type: 'text',
    },
    render: ({ icon, onChange, type }) => (react_1.default.createElement(Stack_1.Stack, { gap: "$xs", alignItems: "stretch" },
        react_1.default.createElement(Form_1.Input, { id: "inlineInputStory", icon: icon, onChange: onChange, placeholder: "This is a placeholder", outlined: true, type: type }),
        react_1.default.createElement(Button_1.Button, { title: "Submit", onClick: () => { } }, "Submit"))),
};
//# sourceMappingURL=Input.stories.js.map