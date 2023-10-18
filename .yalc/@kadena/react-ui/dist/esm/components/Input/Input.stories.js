import { Button } from '../Button';
import { SystemIcon } from '../Icon';
import { Input } from '../Input';
import { Stack } from '../Stack';
import { vars } from '../../styles/vars.css';
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
    title: 'Form/Input',
    component: Input,
    parameters: {
        docs: {
            description: {
                component: 'The Input component is a wrapper around the native input element that provides the ability to add additional information.',
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
        leftIcon: {
            description: 'Icon rendered inside the input to the left of the input text.',
            options: [
                '-',
                ...Object.keys(SystemIcon),
            ],
            control: {
                type: 'select',
            },
        },
        rightIcon: {
            description: 'Icon rendered inside the input to the right of the input text.',
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
        leftIcon: undefined,
        type: 'text',
        rightIcon: undefined,
        leadingText: '',
        leadingTextWidth: undefined,
        outlined: false,
    },
    render: ({ leftIcon, rightIcon, outlined, leadingText, leadingTextWidth, onChange, disabled, type, }) => (React.createElement(Input, { id: "inlineInputStory", leftIcon: leftIcon, rightIcon: rightIcon, onChange: onChange, placeholder: "This is a placeholder", leadingText: leadingText, leadingTextWidth: leadingTextWidth, outlined: outlined, disabled: disabled, type: type })),
};
export const InlineWithButton = {
    name: 'Inline with button',
    args: {
        leftIcon: undefined,
        type: 'text',
    },
    render: ({ leftIcon, onChange, type }) => (React.createElement(Stack, { gap: "$xs", alignItems: "stretch" },
        React.createElement(Input, { id: "inlineInputStory", leftIcon: leftIcon, onChange: onChange, placeholder: "This is a placeholder", outlined: true, type: type }),
        React.createElement(Button, { title: "Submit", onClick: () => { } }, "Submit"))),
};
//# sourceMappingURL=Input.stories.js.map