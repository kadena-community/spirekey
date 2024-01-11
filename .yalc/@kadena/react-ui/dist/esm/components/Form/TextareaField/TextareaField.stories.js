import { TextareaField } from '../../Form';
import { onLayer2, withContentWidth } from '../../../storyDecorators';
import React, { useState } from 'react';
const meta = {
    title: 'Form/TextareaField',
    component: TextareaField,
    decorators: [withContentWidth, onLayer2],
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
        id: 'TextFieldStory',
        fontFamily: 'codeFont',
        placeholder: 'This is a placeholder',
        value: '',
        onChange: () => { },
    },
    render: ({ disabled, ...rest }) => {
        const [value, setValue] = useState('');
        return (React.createElement(TextareaField, { disabled: disabled, ...rest, value: value, onChange: ({ target }) => setValue(target.value) }));
    },
};
//# sourceMappingURL=TextareaField.stories.js.map