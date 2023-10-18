import { IconButton } from '../IconButton';
import { withCenteredStory } from '../../utils/withCenteredStory';
import React, { useRef } from 'react';
import { Tooltip } from './';
import { container } from './stories.css';
const meta = {
    title: 'Components/Tooltip',
    component: Tooltip.Root,
    decorators: [withCenteredStory],
    parameters: {
        docs: {
            description: {
                component: 'The Tooltip component renders a tooltip with text. The placement of the tooltip can be set with the `placement` prop. The tooltip can be triggered by hovering over the `IconButton` component.',
            },
        },
    },
    argTypes: {
        text: {
            control: {
                type: 'text',
            },
        },
        placement: {
            options: ['top', 'bottom', 'left', 'right'],
            control: {
                type: 'select',
            },
        },
    },
};
export default meta;
export const Dynamic = {
    name: 'Tooltip',
    args: {
        text: "I'm a tooltip, look at me!",
        placement: 'right',
    },
    render: ({ text, placement }) => {
        const ref = useRef(null);
        return (React.createElement("div", { className: container },
            React.createElement(IconButton, { title: "hover me", icon: "Information", onMouseEnter: (e) => Tooltip.handler(e, ref), onMouseLeave: (e) => Tooltip.handler(e, ref) }),
            React.createElement(Tooltip.Root, { placement: placement, ref: ref }, text)));
    },
};
//# sourceMappingURL=Tooltip.stories.js.map