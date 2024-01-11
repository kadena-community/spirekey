"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapped = exports.SpaceBetween = exports.Centered = exports.Vertical = exports.Horizontal = void 0;
const Stack_1 = require("../../Layout/Stack");
const _storyDecorators_1 = require("../../../storyDecorators");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const stories_css_1 = require("../stories.css");
const storyComponents_1 = require("../storyComponents");
const stories_css_2 = require("./stories.css");
const meta = {
    title: 'Layout/Stack',
    component: Stack_1.Stack,
    decorators: [
        (story) => (react_1.default.createElement(react_1.default.Fragment, null,
            story(),
            react_1.default.createElement(storyComponents_1.Legend, { items: [
                    { label: 'Margin', color: 'warning' },
                    { label: 'Padding + Gap', color: 'positive' },
                    { label: 'Content', color: 'info' },
                ] }))),
        _storyDecorators_1.onLayer2,
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
        ...storyComponents_1.sharedStoryArgTypes,
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
exports.default = meta;
exports.Horizontal = {
    name: 'Horizontal Stack',
    args: {
        ...storyComponents_1.defaultBoxArgs,
        gap: 'md',
        flexDirection: 'row',
    },
    render: ({ gap, flexDirection, ...rest }) => {
        return (react_1.default.createElement("div", { className: stories_css_1.containerClass },
            react_1.default.createElement(Stack_1.Stack, { gap: gap, flexDirection: flexDirection, className: stories_css_1.componentClass, ...rest },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 1"),
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 2"),
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 3"),
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 4"),
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 5"),
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 6"))));
    },
};
exports.Vertical = {
    name: 'Vertical Stack',
    args: {
        ...storyComponents_1.defaultBoxArgs,
        gap: 'md',
        flexDirection: 'column',
    },
    render: ({ gap, flexDirection, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Stack_1.Stack, { gap: gap, flexDirection: flexDirection, className: stories_css_1.componentClass, ...rest },
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 1"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 2"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 3"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 4"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 5"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 6")))),
};
exports.Centered = {
    name: 'Align Items Center Stack',
    args: {
        ...storyComponents_1.defaultBoxArgs,
        gap: 'md',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    render: ({ gap, flexDirection, alignItems, justifyContent, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Stack_1.Stack, { gap: gap, flexDirection: flexDirection, alignItems: alignItems, justifyContent: justifyContent, className: stories_css_1.componentClass, ...rest },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$40) }, "Item 1"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$12) }, "Item 2"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$40) }, "Item 3"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$24) }, "Item 4"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$40) }, "Item 5"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$40) }, "Item 6")))),
};
exports.SpaceBetween = {
    name: 'Space Between Stack',
    args: {
        ...storyComponents_1.defaultBoxArgs,
        gap: 'md',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    render: ({ gap, flexDirection, alignItems, justifyContent, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Stack_1.Stack, { gap: gap, flexDirection: flexDirection, alignItems: alignItems, justifyContent: justifyContent, className: stories_css_1.componentClass, ...rest },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$40) }, "Item 1"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$12) }, "Item 2"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$40) }, "Item 3"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$20) }, "Item 4"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$40) }, "Item 5"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$40) }, "Item 6")))),
};
exports.Wrapped = {
    name: 'Wrapped Stack',
    args: {
        ...storyComponents_1.defaultBoxArgs,
        gap: 'md',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    render: ({ gap, flexDirection, alignItems, justifyContent, flexWrap, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Stack_1.Stack, { gap: gap, flexDirection: flexDirection, alignItems: alignItems, justifyContent: justifyContent, flexWrap: flexWrap, className: stories_css_1.componentClass, ...rest },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 1"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 2"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 3"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 4"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 5"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 6")))),
};
//# sourceMappingURL=Stack.stories.js.map