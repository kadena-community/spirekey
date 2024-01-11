import { SelectField } from '../../Form';
import { statusVariant } from '../../Form/FormFieldWrapper/FormFieldWrapper.css';
import { SystemIcon } from '../../Icon';
import { onLayer2, withContentWidth } from '../../../storyDecorators';
import React from 'react';
const meta = {
    title: 'Form/SelectField',
    component: SelectField,
    decorators: [withContentWidth, onLayer2],
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
                ...Object.keys(statusVariant),
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
export const Group = {
    name: 'Select Field',
    args: {
        tag: 'tag',
        helperText: 'This is helper text',
        info: '(optional)',
        label: 'Label',
        disabled: false,
        status: undefined,
        startIcon: React.createElement(SystemIcon.Account, null),
    },
    render: ({ startIcon, disabled, status, tag, helperText, info, label }) => {
        return (React.createElement(SelectField, { tag: tag, info: info, label: label, status: status, disabled: disabled, helperText: helperText, ariaLabel: "Select Story", id: "inputStory", startIcon: startIcon, placeholder: "This is a placeholder" },
            React.createElement("option", { value: "1" }, "Option 1"),
            React.createElement("option", { value: "2" }, "Option 2")));
    },
};
export default meta;
//# sourceMappingURL=SelectField.stories.js.map