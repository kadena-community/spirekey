import { TextareaField } from '../../Form';
import React, { useState } from 'react';
const meta = {
    title: 'Form/TextareaField',
    component: TextareaField,
    parameters: {
        status: { type: 'inDevelopment' },
        docs: {
            description: {
                component: 'The TextareaField component is a wrapper around the native textarea element that provides the ability to add additional information.',
            },
        },
    },
    argTypes: {
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
        textAreaProps: {
            description: 'Props for the textarea element.',
            control: {
                type: 'object',
            },
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: 'false' },
            },
        },
    },
};
export default meta;
export const TextFieldStory = {
    name: 'TextField config',
    args: {
        disabled: false,
        tag: 'tag',
        helperText: 'This is helper text',
        info: '(optional)',
        label: 'Label',
        textAreaProps: {
            id: 'TextFieldStory',
            fontFamily: '$mono',
            placeholder: 'This is a placeholder',
            value: '',
            onChange: () => { },
        },
    },
    render: ({ disabled, textAreaProps, ...rest }) => {
        const [value, setValue] = useState('');
        return (React.createElement(TextareaField, { disabled: disabled, textAreaProps: {
                ...textAreaProps,
                value,
                onChange: ({ target }) => setValue(target.value),
            }, ...rest }));
    },
};
//# sourceMappingURL=TextareaField.stories.js.map