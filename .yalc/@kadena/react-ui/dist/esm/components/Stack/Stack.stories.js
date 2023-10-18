import { Stack } from '../Stack';
import { vars } from '../../styles/vars.css';
import { withCenteredStory } from '../../utils/withCenteredStory';
import className from 'classnames';
import React from 'react';
import { itemClass, itemSizeClass } from './stories.css';
const spaceOptions = [
    undefined,
    ...Object.keys(vars.sizes),
];
const meta = {
    title: 'Layout/Stack',
    decorators: [withCenteredStory],
    parameters: {
        docs: {
            description: {
                component: 'This layout component is just a simplified abstraction on flexbox. It allows you to use basic flex properties, but does not offer the full flexibility of flexbox.',
            },
        },
    },
    component: Stack,
    argTypes: {
        margin: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property with pre-defined size values.',
        },
        marginX: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property on X axis with pre-defined size values.',
        },
        marginY: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for margin property on Y axis with pre-defined size values.',
        },
        marginTop: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top margin property with pre-defined size values.',
        },
        marginBottom: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top margin property with pre-defined size values.',
        },
        marginLeft: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for left margin property with pre-defined size values.',
        },
        marginRight: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for right margin property with pre-defined size values.',
        },
        gap: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Defines the gaps between rows and columns with pre-defined size values.',
        },
        justifyContent: {
            options: [
                'flex-start',
                'center',
                'flex-end',
                'space-around',
                'space-between',
            ],
            control: { type: 'select' },
            description: 'Defines how the browser distributes space between and around content items along the main-axis of a flex container',
        },
        alignItems: {
            options: [
                'flex-start',
                'center',
                'flex-end',
                'stretch',
            ],
            control: { type: 'select' },
            description: 'Controls the alignment of items on the cross axis',
        },
        direction: {
            options: [
                'row',
                'row-reverse',
                'column',
                'column-reverse',
            ],
            control: { type: 'select' },
            description: 'Controls the flex direction of text, table columns, and horizontal overflow.',
        },
        wrap: {
            options: ['wrap', 'nowrap'],
            control: { type: 'select' },
            description: 'Sets whether flex items are forced onto one line or can wrap onto multiple lines.',
        },
        padding: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property with pre-defined size values.',
        },
        paddingX: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property on X axis with pre-defined size values.',
        },
        paddingY: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for padding property on Y axis with pre-defined size values.',
        },
        paddingTop: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for top padding property with pre-defined size values.',
        },
        paddingBottom: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for bottom padding property with pre-defined size values.',
        },
        paddingLeft: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for left padding property with pre-defined size values.',
        },
        paddingRight: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Value for right padding property with pre-defined size values.',
        },
    },
};
export default meta;
export const Horizontal = {
    name: 'Horizontal Stack',
    args: {
        gap: '$md',
        direction: 'row',
    },
    render: ({ gap, direction }) => (React.createElement(React.Fragment, null,
        React.createElement(Stack, { gap: gap, direction: direction },
            React.createElement("div", { className: itemClass }, "Item 1"),
            React.createElement("div", { className: itemClass }, "Item 2"),
            React.createElement("div", { className: itemClass }, "Item 3"),
            React.createElement("div", { className: itemClass }, "Item 4"),
            React.createElement("div", { className: itemClass }, "Item 5"),
            React.createElement("div", { className: itemClass }, "Item 6")))),
};
export const Vertical = {
    name: 'Vertical Stack',
    args: {
        gap: '$md',
        direction: 'column',
    },
    render: ({ gap, direction }) => (React.createElement(React.Fragment, null,
        React.createElement(Stack, { gap: gap, direction: direction },
            React.createElement("div", { className: itemClass }, "Item 1"),
            React.createElement("div", { className: itemClass }, "Item 2"),
            React.createElement("div", { className: itemClass }, "Item 3"),
            React.createElement("div", { className: itemClass }, "Item 4"),
            React.createElement("div", { className: itemClass }, "Item 5"),
            React.createElement("div", { className: itemClass }, "Item 6")))),
};
export const Centered = {
    name: 'Align Items Center Stack',
    args: {
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    render: ({ gap, direction, alignItems, justifyContent }) => (React.createElement(React.Fragment, null,
        React.createElement(Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent },
            React.createElement("div", { className: className(itemClass, itemSizeClass.$40) }, "Item 1"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$12) }, "Item 2"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$40) }, "Item 3"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$24) }, "Item 4"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$40) }, "Item 5"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$40) }, "Item 6")))),
};
export const SpaceBetween = {
    name: 'Space Between Stack',
    args: {
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    render: ({ gap, direction, alignItems, justifyContent }) => (React.createElement(React.Fragment, null,
        React.createElement(Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent },
            React.createElement("div", { className: className(itemClass, itemSizeClass.$40) }, "Item 1"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$12) }, "Item 2"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$40) }, "Item 3"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$20) }, "Item 4"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$40) }, "Item 5"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$40) }, "Item 6")))),
};
export const Wrapped = {
    name: 'Wrapped Stack',
    args: {
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        wrap: 'wrap',
    },
    render: ({ gap, direction, alignItems, justifyContent, wrap }) => (React.createElement(React.Fragment, null,
        React.createElement(Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent, wrap: wrap },
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 1"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 2"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 3"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 4"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 5"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 6")))),
};
//# sourceMappingURL=Stack.stories.js.map