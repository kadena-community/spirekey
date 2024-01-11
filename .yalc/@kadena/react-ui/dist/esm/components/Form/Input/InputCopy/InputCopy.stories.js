import { InputCopy } from '../../../Form';
import { onLayer2, withContentWidth } from '../../../../storyDecorators';
import React from 'react';
const meta = {
    title: 'Form/Input/InputCopy',
    component: InputCopy,
    decorators: [withContentWidth, onLayer2],
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
        type: 'text',
        leadingText: '',
        outlined: false,
    },
    render: (props) => {
        return (React.createElement(React.Fragment, null,
            React.createElement(InputCopy, { ...props, id: "InputCopyStory", placeholder: "This is a placeholder" })));
    },
};
//# sourceMappingURL=InputCopy.stories.js.map