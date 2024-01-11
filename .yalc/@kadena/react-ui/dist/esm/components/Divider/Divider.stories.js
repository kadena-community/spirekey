import { Card } from '../Card';
import { withContentWidth } from '../../storyDecorators';
import React from 'react';
import { Divider } from './Divider';
const meta = {
    title: 'Layout/Divider',
    decorators: [withContentWidth],
    parameters: {
        status: { type: 'stable' },
        docs: {
            description: {
                component: 'Component which helps to separate one logical group of element from others.',
            },
        },
    },
    component: Divider,
};
export const Static = {
    name: 'Divider',
    render: () => {
        return (React.createElement(React.Fragment, null,
            React.createElement(Card, null,
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                React.createElement(Divider, null),
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")));
    },
};
export default meta;
//# sourceMappingURL=Divider.stories.js.map