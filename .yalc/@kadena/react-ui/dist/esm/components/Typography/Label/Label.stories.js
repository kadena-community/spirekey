import { Input } from '../../Input';
import { Stack } from '../../Stack';
import { Label } from '../../Typography/Label/Label';
import React from 'react';
const meta = {
    title: 'Typography/Label',
    component: Label,
    argTypes: {
        children: {
            control: { type: 'text' },
        },
    },
};
export default meta;
export const Primary = {
    name: 'Label',
    args: {
        children: 'Label',
    },
    render: ({ children }) => (React.createElement(Stack, { alignItems: "center" },
        React.createElement(Label, { htmlFor: "id" }, children),
        React.createElement(Input, { id: "id", placeholder: "Input", outlined: true }))),
};
//# sourceMappingURL=Label.stories.js.map