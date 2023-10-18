import { Textarea } from '../TextArea';
import React, { useState } from 'react';
const meta = {
    title: 'Form/TextArea',
    component: Textarea,
    parameters: {
        docs: {
            description: {
                component: 'The TextArea component is a wrapper around the native textArea element that provides the ability to add additional information.',
            },
        },
    },
    argTypes: {
        disabled: {
            description: 'Disables the textArea and applies visual styling.',
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
export const TextAreaStory = {
    name: 'TextArea config',
    args: {
        disabled: false,
        fontFamily: '$mono',
        outlined: true,
    },
    render: (props) => {
        const [value, setValue] = useState('');
        return (React.createElement(Textarea, { ...props, value: value, onChange: ({ target }) => setValue(target.value), id: "inlineInputStory", placeholder: "This is a placeholder" }));
    },
};
//# sourceMappingURL=TextArea.stories.js.map