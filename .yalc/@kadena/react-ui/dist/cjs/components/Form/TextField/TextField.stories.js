"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const Form_1 = require("../../Form");
const FormFieldWrapper_css_1 = require("../../Form/FormFieldWrapper/FormFieldWrapper.css");
const Icon_1 = require("../../Icon");
const vars_css_1 = require("../../../styles/vars.css");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Form/TextField',
    parameters: {
        status: { type: 'inDevelopment' },
        docs: {
            description: {
                component: 'TextField is the composition of Input and FormFieldWrapper to provide an input with a label, helper text, and other peripheral information.',
            },
        },
    },
    argTypes: {
        label: {
            description: 'Label for the input',
            control: {
                type: 'text',
            },
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
        leadingText: {
            description: "Leading text that is rendered inside the input's border.",
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
                undefined,
                ...Object.keys(vars_css_1.vars.sizes).map((key) => key),
            ],
        },
        status: {
            options: [
                undefined,
                ...Object.keys(FormFieldWrapper_css_1.statusVariant),
            ],
            description: 'This determines the color of the helper text and input border. It can be used to indicate an error.',
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
        icon: {
            description: 'Icon rendered inside the input to the left of the input text.',
            options: Object.keys(Icon_1.SystemIcon),
            control: {
                type: 'select',
            },
        },
    },
};
exports.Group = {
    name: 'Text Field',
    args: {
        tag: 'tag',
        helperText: 'This is helper text',
        info: '(optional)',
        label: 'Label',
        disabled: false,
        status: undefined,
        icon: 'Account',
        leadingText: 'Leading',
        leadingTextWidth: undefined,
    },
    render: ({ leadingText, icon, disabled, status, tag, helperText, info, label, leadingTextWidth, }) => {
        return (react_1.default.createElement(Form_1.TextField, { tag: tag, info: info, label: label, status: status, disabled: disabled, helperText: helperText, leadingTextWidth: leadingTextWidth, inputProps: {
                id: 'inputStory',
                leadingText,
                icon,
                placeholder: 'This is a placeholder',
            } }));
    },
};
exports.default = meta;
//# sourceMappingURL=TextField.stories.js.map