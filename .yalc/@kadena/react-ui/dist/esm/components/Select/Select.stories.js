import { SystemIcon } from '../Icon';
import React, { useState } from 'react';
import { Select } from './Select';
const meta = {
    title: 'Form/Select',
    component: Select,
    parameters: {
        docs: {
            description: {
                component: 'The Select component renders a select element with options. The select element can be disabled with the `disabled` prop. The icon of the select element can be set with the `icon` prop.',
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
        icon: {
            options: [
                ...['-'],
                ...Object.keys(SystemIcon),
            ],
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
        icon: undefined,
    },
    render: ({ icon, disabled }) => {
        const [value, setValue] = useState('1');
        return (React.createElement(Select, { id: "select-story", ariaLabel: 'select', icon: icon, onChange: (e) => {
                console.log('clicked on', e.target.value);
                setValue(e.target.value);
            }, disabled: Boolean(disabled), value: value },
            React.createElement("option", { value: '1' }, "option 1"),
            React.createElement("option", { value: '2' }, "option 2")));
    },
};
//# sourceMappingURL=Select.stories.js.map