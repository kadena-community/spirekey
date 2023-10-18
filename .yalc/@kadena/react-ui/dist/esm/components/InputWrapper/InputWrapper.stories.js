import { Input } from '../Input';
import { InputWrapper } from '../InputWrapper';
import { vars } from '../../styles/vars.css';
import React from 'react';
import { statusVariant } from './InputWrapper.css';
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
                ...Object.keys(vars.sizes).map((key) => key),
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
                ...Object.keys(statusVariant),
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
export const Group = {
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
        return (React.createElement(InputWrapper, { tag: tag, info: info, label: label, leadingTextWidth: leadingTextWidth, status: status, disabled: disabled, helperText: helperText, htmlFor: "inputStory" },
            React.createElement(Input, { id: "inputStory", placeholder: "Input 1", disabled: disabled, leadingText: "Leading" }),
            React.createElement(Input, { id: "inputStory2", placeholder: "Input 2", disabled: disabled, leadingText: "Leading 2" })));
    },
};
export default meta;
//# sourceMappingURL=InputWrapper.stories.js.map