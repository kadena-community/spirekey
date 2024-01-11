import { SystemIcon } from '../../Icon';
import { onLayer2, withContentWidth } from '../../../storyDecorators';
import React, { useState } from 'react';
import { Select } from './Select';
const meta = {
    title: 'Form/Select',
    component: Select,
    decorators: [withContentWidth, onLayer2],
    parameters: {
        status: { type: 'inDevelopment' },
        docs: {
            description: {
                component: 'The Select component renders a select element with options. The select element can be disabled with the `disabled` prop. The startIcon of the select element can be set with the `startIcon` prop.',
            },
        },
    },
    argTypes: {
        disabled: {
            description: 'toggle disabled state of component',
            control: {
                type: 'boolean',
                defaultValue: false,
            },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        startIcon: {
            options: ['-', ...Object.keys(SystemIcon)],
            control: {
                type: 'select',
            },
        },
    },
};
export default meta;
export const Dynamic = {
    name: 'Select',
    args: {
        startIcon: undefined,
    },
    render: ({ startIcon, disabled, outlined }) => {
        const [value, setValue] = useState('1');
        const IconComponent = startIcon !== '-'
            ? SystemIcon[startIcon]
            : undefined;
        return (React.createElement(Select, { id: "select-story", ariaLabel: 'select', startIcon: IconComponent && React.createElement(IconComponent, null), onChange: (e) => {
                console.log('clicked on', e.target.value);
                setValue(e.target.value);
            }, disabled: Boolean(disabled), outlined: Boolean(outlined), value: value },
            React.createElement("option", { value: '1' }, "option 1"),
            React.createElement("option", { value: '2' }, "option 2")));
    },
};
//# sourceMappingURL=Select.stories.js.map