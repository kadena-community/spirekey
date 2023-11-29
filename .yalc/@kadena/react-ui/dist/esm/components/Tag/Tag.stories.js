import { Button } from '../Button';
import { Tag } from '../Tag';
import React, { useState } from 'react';
const meta = {
    title: 'Components/Tag',
    parameters: {
        status: {
            type: ['inDevelopment'],
        },
        docs: {
            description: {
                component: 'The Tag component renders a tag with a text. This tag can be dismissed by the user by clicking the X icon when the optional `onClose` prop is provided.',
            },
        },
    },
    component: Tag,
    argTypes: {
        text: {
            control: {
                type: 'text',
            },
        },
        hasClose: {
            control: {
                type: 'boolean',
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'Tag',
    args: {
        text: 'Chain:1',
        hasClose: true,
    },
    render: ({ text, hasClose }) => {
        const [closed, setClosed] = useState(false);
        if (closed)
            return React.createElement(Button, { onClick: () => setClosed(false) }, "Reset");
        return (React.createElement(Tag, { onClose: hasClose ? () => setClosed(true) : undefined }, text));
    },
};
//# sourceMappingURL=Tag.stories.js.map