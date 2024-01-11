"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const Form_1 = require("../../Form");
const FormFieldWrapper_css_1 = require("../../Form/FormFieldWrapper/FormFieldWrapper.css");
const Icon_1 = require("../../Icon");
const _storyDecorators_1 = require("../../../storyDecorators");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Form/SelectField',
    component: Form_1.SelectField,
    decorators: [_storyDecorators_1.withContentWidth, _storyDecorators_1.onLayer2],
    parameters: {
        status: { type: 'inDevelopment' },
        docs: {
            description: {
                component: 'SelectField is the composition of the Select and FormFieldWrapper components to provide a select with a label, helper text, and other peripheral information.',
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
    },
};
exports.Group = {
    name: 'Select Field',
    args: {
        tag: 'tag',
        helperText: 'This is helper text',
        info: '(optional)',
        label: 'Label',
        disabled: false,
        status: undefined,
        startIcon: react_1.default.createElement(Icon_1.SystemIcon.Account, null),
    },
    render: ({ startIcon, disabled, status, tag, helperText, info, label }) => {
        return (react_1.default.createElement(Form_1.SelectField, { tag: tag, info: info, label: label, status: status, disabled: disabled, helperText: helperText, ariaLabel: "Select Story", id: "inputStory", startIcon: startIcon, placeholder: "This is a placeholder" },
            react_1.default.createElement("option", { value: "1" }, "Option 1"),
            react_1.default.createElement("option", { value: "2" }, "Option 2")));
    },
};
exports.default = meta;
//# sourceMappingURL=SelectField.stories.js.map