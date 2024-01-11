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
const _storyDecorators_1 = require("../../../storyDecorators");
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
    decorators: [_storyDecorators_1.withContentWidth, _storyDecorators_1.onLayer2],
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
        startIcon: {
            description: 'Icon rendered inside the input to the left of the input text.',
            options: ['-', ...Object.keys(Icon_1.SystemIcon)],
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
        startIcon: undefined,
        type: 'text',
        leadingText: '',
        outlined: false,
    },
    render: ({ startIcon, outlined, leadingText, onChange, disabled, type }) => {
        const IconComponent = startIcon !== '-'
            ? Icon_1.SystemIcon[startIcon]
            : undefined;
        return (react_1.default.createElement(Form_1.Input, { id: "inlineInputStory", startIcon: IconComponent && react_1.default.createElement(IconComponent, null), onChange: onChange, placeholder: "This is a placeholder", leadingText: leadingText, outlined: outlined, disabled: disabled, type: type }));
    },
};
exports.InlineWithButton = {
    name: 'Inline with button',
    args: {
        startIcon: undefined,
        type: 'text',
    },
    render: ({ startIcon, onChange, type }) => {
        const IconComponent = startIcon !== '-'
            ? Icon_1.SystemIcon[startIcon]
            : undefined;
        return (react_1.default.createElement(Stack_1.Stack, { gap: "xs", alignItems: "stretch" },
            react_1.default.createElement(Form_1.Input, { id: "inlineInputStory", startIcon: IconComponent && react_1.default.createElement(IconComponent, null), onChange: onChange, placeholder: "This is a placeholder", outlined: true, type: type }),
            react_1.default.createElement(Button_1.Button, { title: "Submit", onClick: () => { } }, "Submit")));
    },
};
//# sourceMappingURL=Input.stories.js.map