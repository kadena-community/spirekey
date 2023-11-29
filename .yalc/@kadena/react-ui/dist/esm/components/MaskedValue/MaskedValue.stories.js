import React from 'react';
import { MaskedValue } from './MaskedValue';
const meta = {
    title: 'Patterns/MaskedValue',
    parameters: {
        status: {
            type: ['experimental'],
        },
        docs: {
            description: {
                component: 'This component will visually render the set value with a mask. The mask will hide part of the value and show a number of asterisks in its stead. The number of unmasked characters can be set with the `startUnmaskedValues` and `endUnmaskedValues` props. The default visibility of the value can be set with the `defaultVisibility` prop.',
            },
        },
    },
    argTypes: {
        title: {
            control: {
                type: 'text',
            },
        },
        value: {
            control: {
                type: 'text',
            },
        },
        defaultVisibility: {
            control: {
                type: 'boolean',
            },
        },
        startUnmaskedValues: {
            control: {
                type: 'number',
            },
        },
        endUnmaskedValues: {
            control: {
                type: 'number',
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'MaskedValue',
    args: {
        title: 'Account',
        value: 'k:1234567890abcdef',
        defaultVisibility: false,
        startUnmaskedValues: 6,
        endUnmaskedValues: 4,
    },
    render: ({ title, value, defaultVisibility, startUnmaskedValues, endUnmaskedValues, }) => {
        return (React.createElement(React.Fragment, null,
            React.createElement(MaskedValue, { title: title, value: value, defaultVisibility: defaultVisibility, startUnmaskedValues: startUnmaskedValues, endUnmaskedValues: endUnmaskedValues })));
    },
};
//# sourceMappingURL=MaskedValue.stories.js.map