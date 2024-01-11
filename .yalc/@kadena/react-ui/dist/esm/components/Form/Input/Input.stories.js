import { Button } from '../../Button';
import { Input } from '../../Form';
import { SystemIcon } from '../../Icon';
import { Stack } from '../../Layout/Stack';
import { onLayer2, withContentWidth } from '../../../storyDecorators';
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
    decorators: [withContentWidth, onLayer2],
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
        startIcon: {
            description: 'Icon rendered inside the input to the left of the input text.',
            options: ['-', ...Object.keys(SystemIcon)],
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
        startIcon: undefined,
        type: 'text',
        leadingText: '',
        outlined: false,
    },
    render: ({ startIcon, outlined, leadingText, onChange, disabled, type }) => {
        const IconComponent = startIcon !== '-'
            ? SystemIcon[startIcon]
            : undefined;
        return (React.createElement(Input, { id: "inlineInputStory", startIcon: IconComponent && React.createElement(IconComponent, null), onChange: onChange, placeholder: "This is a placeholder", leadingText: leadingText, outlined: outlined, disabled: disabled, type: type }));
    },
};
export const InlineWithButton = {
    name: 'Inline with button',
    args: {
        startIcon: undefined,
        type: 'text',
    },
    render: ({ startIcon, onChange, type }) => {
        const IconComponent = startIcon !== '-'
            ? SystemIcon[startIcon]
            : undefined;
        return (React.createElement(Stack, { gap: "xs", alignItems: "stretch" },
            React.createElement(Input, { id: "inlineInputStory", startIcon: IconComponent && React.createElement(IconComponent, null), onChange: onChange, placeholder: "This is a placeholder", outlined: true, type: type }),
            React.createElement(Button, { title: "Submit", onClick: () => { } }, "Submit")));
    },
};
//# sourceMappingURL=Input.stories.js.map