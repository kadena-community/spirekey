import { ContentHeader } from '../ContentHeader';
import { SystemIcon } from '../Icon';
import React from 'react';
const meta = {
    title: 'Content/ContentHeader',
    argTypes: {
        icon: {
            options: Object.keys(SystemIcon),
            control: {
                type: 'select',
            },
        },
        heading: {
            control: {
                type: 'text',
            },
        },
        description: {
            control: {
                type: 'text',
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'ContentHeader',
    args: {
        icon: 'Account',
        heading: 'Incoming Transactions',
        description: 'This table is listing all the incoming transaction sorted by date descending descriptive text.',
    },
    render: ({ icon, heading, description }) => {
        return (React.createElement(ContentHeader, { heading: heading, icon: icon, description: description }));
    },
};
//# sourceMappingURL=ContentHeader.stories.js.map