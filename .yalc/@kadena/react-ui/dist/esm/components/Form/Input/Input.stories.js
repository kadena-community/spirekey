import { Button } from '../../Button';
import { Input } from '../../Form';
import { SystemIcon } from '../../Icon';
import { Stack } from '../../Layout/Stack';
import { vars } from '../../../styles/vars.css';
import React from 'react';
const HTMLInputTypes = [
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
];
const meta = {
    title: 'Form/Input/Input',
    component: Input,
    parameters: {
        status: { type: 'inDevelopment' },
        docs: {
            description: {
                component: 'The Input component is a wrapper around the native input element that provides the ability to add additional information. This handles any kind of children that will be rendered inside the input on the right side of it.',
            },
        },
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: HTMLInputTypes,
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
            description: 'Icon rendered inside the input to the left of the input text.',
            options: [
                '-',
                ...Object.keys(SystemIcon),
            ],
            control: {
                type: 'select',
            },
        },
        leadingText: {
            description: 'Leading text that is rendered to the left of the input.',
            control: {
                type: 'text',
            },
        },
        leadingTextWidth: {
            description: 'Width of the leading text. Defaults to the size of the text itself.',
            control: {
                type: 'select',
            },
            options: [
                '- Omit this property to auto-size the leading text',
                ...Object.keys(vars.sizes).map((key) => key),
            ],
        },
        outlined: {
            description: 'Option to render the input with an outline.',
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
export const Dynamic = {
    name: 'Input',
    args: {
        icon: undefined,
        type: 'text',
        leadingTextWidth: undefined,
        leadingText: '',
        outlined: false,
    },
    render: ({ icon, outlined, leadingText, leadingTextWidth, onChange, disabled, type, }) => (React.createElement(Input, { id: "inlineInputStory", icon: icon, onChange: onChange, placeholder: "This is a placeholder", leadingTextWidth: leadingTextWidth, leadingText: leadingText, outlined: outlined, disabled: disabled, type: type })),
};
export const InlineWithButton = {
    name: 'Inline with button',
    args: {
        icon: undefined,
        type: 'text',
    },
    render: ({ icon, onChange, type }) => (React.createElement(Stack, { gap: "$xs", alignItems: "stretch" },
        React.createElement(Input, { id: "inlineInputStory", icon: icon, onChange: onChange, placeholder: "This is a placeholder", outlined: true, type: type }),
        React.createElement(Button, { title: "Submit", onClick: () => { } }, "Submit"))),
};
//# sourceMappingURL=Input.stories.js.map