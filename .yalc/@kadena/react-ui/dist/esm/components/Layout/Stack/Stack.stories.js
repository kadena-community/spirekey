import { Stack } from '../../Layout/Stack';
import { onLayer2 } from '../../../storyDecorators';
import className from 'classnames';
import React from 'react';
import { componentClass, containerClass, itemClass } from '../stories.css';
import { Legend, defaultBoxArgs, sharedStoryArgTypes, } from '../storyComponents';
import { itemSizeClass } from './stories.css';
const meta = {
    title: 'Layout/Stack',
    component: Stack,
    decorators: [
        (story) => (React.createElement(React.Fragment, null,
            story(),
            React.createElement(Legend, { items: [
                    { label: 'Margin', color: 'warning' },
                    { label: 'Padding + Gap', color: 'positive' },
                    { label: 'Content', color: 'info' },
                ] }))),
        onLayer2,
    ],
    parameters: {
        status: {
            type: 'releaseCandidate',
        },
        docs: {
            description: {
                component: 'This layout component is just a simplified abstraction on flexbox. It allows you to use basic flex properties, but does not offer the full flexibility of flexbox.',
            },
        },
    },
    argTypes: {
        ...sharedStoryArgTypes,
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
            options: ['flex-start', 'center', 'flex-end', 'stretch'],
            control: { type: 'select' },
            description: 'Controls the alignment of items on the cross axis',
        },
        flexDirection: {
            options: ['row', 'row-reverse', 'column', 'column-reverse'],
            control: { type: 'select' },
            description: 'Controls the flex direction of text, table columns, and horizontal overflow.',
        },
        flexWrap: {
            options: ['wrap', 'nowrap'],
            control: { type: 'select' },
            description: 'Sets whether flex items are forced onto one line or can wrap onto multiple lines.',
        },
    },
};
export default meta;
export const Horizontal = {
    name: 'Horizontal Stack',
    args: {
        ...defaultBoxArgs,
        gap: 'md',
        flexDirection: 'row',
    },
    render: ({ gap, flexDirection, ...rest }) => {
        return (React.createElement("div", { className: containerClass },
            React.createElement(Stack, { gap: gap, flexDirection: flexDirection, className: componentClass, ...rest },
                React.createElement("div", { className: itemClass }, "Item 1"),
                React.createElement("div", { className: itemClass }, "Item 2"),
                React.createElement("div", { className: itemClass }, "Item 3"),
                React.createElement("div", { className: itemClass }, "Item 4"),
                React.createElement("div", { className: itemClass }, "Item 5"),
                React.createElement("div", { className: itemClass }, "Item 6"))));
    },
};
export const Vertical = {
    name: 'Vertical Stack',
    args: {
        ...defaultBoxArgs,
        gap: 'md',
        flexDirection: 'column',
    },
    render: ({ gap, flexDirection, ...rest }) => (React.createElement("div", { className: containerClass },
        React.createElement(Stack, { gap: gap, flexDirection: flexDirection, className: componentClass, ...rest },
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
        ...defaultBoxArgs,
        gap: 'md',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    render: ({ gap, flexDirection, alignItems, justifyContent, ...rest }) => (React.createElement("div", { className: containerClass },
        React.createElement(Stack, { gap: gap, flexDirection: flexDirection, alignItems: alignItems, justifyContent: justifyContent, className: componentClass, ...rest },
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
        ...defaultBoxArgs,
        gap: 'md',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    render: ({ gap, flexDirection, alignItems, justifyContent, ...rest }) => (React.createElement("div", { className: containerClass },
        React.createElement(Stack, { gap: gap, flexDirection: flexDirection, alignItems: alignItems, justifyContent: justifyContent, className: componentClass, ...rest },
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
        ...defaultBoxArgs,
        gap: 'md',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    render: ({ gap, flexDirection, alignItems, justifyContent, flexWrap, ...rest }) => (React.createElement("div", { className: containerClass },
        React.createElement(Stack, { gap: gap, flexDirection: flexDirection, alignItems: alignItems, justifyContent: justifyContent, flexWrap: flexWrap, className: componentClass, ...rest },
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 1"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 2"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 3"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 4"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 5"),
            React.createElement("div", { className: className(itemClass, itemSizeClass.$64) }, "Item 6")))),
};
//# sourceMappingURL=Stack.stories.js.map