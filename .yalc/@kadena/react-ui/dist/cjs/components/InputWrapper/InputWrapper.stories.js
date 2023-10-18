"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const Input_1 = require("../Input");
const InputWrapper_1 = require("../InputWrapper");
const vars_css_1 = require("../../styles/vars.css");
const react_1 = __importDefault(require("react"));
const InputWrapper_css_1 = require("./InputWrapper.css");
const meta = {
    title: 'Form/InputWrapper',
    parameters: {
        docs: {
            description: {
                component: 'The InputWrapper component is intended to be used to wrap one or more form input components to provide them with a shared and optional label, tag, info, helper text and status colors.',
            },
        },
    },
    argTypes: {
        label: {
            description: 'Label for the input.',
            control: {
                type: 'text',
            },
        },
        leadingTextWidth: {
            description: 'Width of the leading text of all inputs inside. Each of the inputs will default to the length of their leading text when this is not set.',
            control: {
                type: 'select',
            },
            options: [
                undefined,
                ...Object.keys(vars_css_1.vars.sizes).map((key) => key),
            ],
        },
        tag: {
            description: 'Tag that is rendered next to the label',
            control: {
                type: 'text',
            },
        },
        info: {
            description: 'Text that is rendered on the top right with an info icon',
            control: {
                type: 'text',
            },
        },
        helperText: {
            description: 'Text that is rendered below the input to give the user additional information. Often will be used for validation messages.',
            control: {
                type: 'text',
            },
        },
        status: {
            description: 'This determines the color of the helper text and input border. It can be used to indicate an error.',
            options: [
                undefined,
                ...Object.keys(InputWrapper_css_1.statusVariant),
            ],
            control: {
                type: 'select',
            },
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
    },
};
exports.Group = {
    name: 'Input Group',
    args: {
        tag: 'tag',
        helperText: 'This is helper text',
        info: '(optional)',
        label: 'Label',
        leadingTextWidth: undefined,
        disabled: false,
        status: undefined,
    },
    render: ({ disabled, status, tag, helperText, info, label, leadingTextWidth, }) => {
        return (react_1.default.createElement(InputWrapper_1.InputWrapper, { tag: tag, info: info, label: label, leadingTextWidth: leadingTextWidth, status: status, disabled: disabled, helperText: helperText, htmlFor: "inputStory" },
            react_1.default.createElement(Input_1.Input, { id: "inputStory", placeholder: "Input 1", disabled: disabled, leadingText: "Leading" }),
            react_1.default.createElement(Input_1.Input, { id: "inputStory2", placeholder: "Input 2", disabled: disabled, leadingText: "Leading 2" })));
    },
};
exports.default = meta;
//# sourceMappingURL=InputWrapper.stories.js.map