import { InputCopy } from '../../../Form';
import React from 'react';
const meta = {
    title: 'Form/Input/InputCopy',
    component: InputCopy,
    parameters: {
        docs: {
            description: {
                component: 'The InputCopy is a composition of the native Input element and a copy button.',
            },
        },
    },
};
export default meta;
export const InputCopyStory = {
    name: 'InputCopy',
    args: {
        icon: undefined,
        type: 'text',
        leadingTextWidth: undefined,
        leadingText: '',
        outlined: false,
    },
    render: (props) => {
        return (React.createElement(React.Fragment, null,
            React.createElement(InputCopy, { ...props, id: "InputCopyStory", placeholder: "This is a placeholder" })));
    },
};
//# sourceMappingURL=InputCopy.stories.js.map