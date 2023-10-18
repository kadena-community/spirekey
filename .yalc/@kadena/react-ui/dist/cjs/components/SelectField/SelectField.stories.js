"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const Icon_1 = require("../Icon");
const InputWrapper_css_1 = require("../InputWrapper/InputWrapper.css");
const SelectField_1 = require("../SelectField");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Components/SelectField',
    parameters: {
        docs: {
            description: {
                component: 'SelectField is the composition of the Select and InputWrapper components to provide a select with a label, helper text, and other peripheral information.',
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
                ...Object.keys(InputWrapper_css_1.statusVariant),
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
            description: 'Icon rendered inside the select to the left of the text.',
            options: Object.keys(Icon_1.SystemIcon),
            control: {
                type: 'select',
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
        icon: 'Account',
    },
    render: ({ icon, disabled, status, tag, helperText, info, label }) => {
        return (react_1.default.createElement(SelectField_1.SelectField, { tag: tag, info: info, label: label, status: status, disabled: disabled, helperText: helperText, selectProps: {
                ariaLabel: 'Select Story',
                id: 'inputStory',
                icon,
                placeholder: 'This is a placeholder',
            } },
            react_1.default.createElement("option", { value: "1" }, "Option 1"),
            react_1.default.createElement("option", { value: "2" }, "Option 2")));
    },
};
exports.default = meta;
//# sourceMappingURL=SelectField.stories.js.map