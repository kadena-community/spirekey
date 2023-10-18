import { SystemIcon } from '../../Icon';
import React from 'react';
import { sizeVariants } from '../IconWrapper.css';
import { gridContainer, gridItem } from '../stories.css';
const meta = {
    title: 'Icons/SystemIcons',
    argTypes: {
        icon: {
            control: {
                type: 'text',
            },
        },
        size: {
            options: Object.keys(sizeVariants),
            control: {
                type: 'select',
            },
        },
    },
};
export default meta;
export const Primary = {
    name: 'System',
    args: {
        icon: '',
        size: 'md',
    },
    render: ({ icon, size }) => {
        const searchRegexp = new RegExp(icon, 'i');
        return (React.createElement("div", { className: gridContainer }, Object.entries(SystemIcon)
            .filter(([k]) => searchRegexp.test(k))
            .map(([k, Icon]) => (React.createElement("div", { key: k, className: gridItem },
            React.createElement(Icon, { size: size }),
            React.createElement("span", null, k))))));
    },
};
//# sourceMappingURL=SystemIcons.stories.js.map