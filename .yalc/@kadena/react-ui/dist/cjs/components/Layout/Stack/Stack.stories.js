"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapped = exports.SpaceBetween = exports.Centered = exports.Vertical = exports.Horizontal = void 0;
const Stack_1 = require("../../Layout/Stack");
const vars_css_1 = require("../../../styles/vars.css");
const withCenteredStory_1 = require("../../../utils/withCenteredStory");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const stories_css_1 = require("../stories.css");
const stories_css_2 = require("./stories.css");
const spaceOptions = [
    undefined,
    ...Object.keys(vars_css_1.vars.sizes),
];
const contentWidthOptions = [
    undefined,
    ...Object.keys(vars_css_1.vars.contentWidth),
];
const dimensionOptions = ['100%', 'min-content', 'max-content'];
const meta = {
    title: 'Layout/Stack',
    component: Stack_1.Stack,
    decorators: [withCenteredStory_1.withCenteredStory],
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
        overflow: {
            options: ['hidden', 'visible', 'scroll', 'auto'],
            control: {
                type: 'select',
            },
            description: 'Overflow css property',
        },
        width: {
            options: [...spaceOptions, ...dimensionOptions, ...contentWidthOptions],
            control: {
                type: 'select',
            },
            description: 'Value for width property with pre-defined size values.',
        },
        minWidth: {
            options: dimensionOptions,
            control: {
                type: 'select',
            },
            description: 'Value for minWidth property with pre-defined size values.',
        },
        maxWidth: {
            options: [...dimensionOptions, ...contentWidthOptions],
            control: {
                type: 'select',
            },
            description: 'Value for maxWidth property with pre-defined size values.',
        },
        height: {
            options: [...spaceOptions, ...dimensionOptions],
            control: {
                type: 'select',
            },
            description: 'Value for height property with pre-defined size values.',
        },
        minHeight: {
            options: dimensionOptions,
            control: {
                type: 'select',
            },
            description: 'Value for minHeight property with pre-defined size values.',
        },
        maxHeight: {
            options: dimensionOptions,
            control: {
                type: 'select',
            },
            description: 'Value for maxHeight property with pre-defined size values.',
        },
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
exports.default = meta;
const defaultArgs = {
    width: undefined,
    minWidth: undefined,
    maxWidth: undefined,
    height: undefined,
    minHeight: undefined,
    maxHeight: undefined,
    margin: undefined,
    marginX: undefined,
    marginY: undefined,
    marginTop: undefined,
    marginBottom: undefined,
    marginLeft: undefined,
    marginRight: undefined,
    gap: undefined,
    justifyContent: undefined,
    alignItems: undefined,
    direction: undefined,
    wrap: undefined,
    padding: undefined,
    paddingX: undefined,
    paddingY: undefined,
    paddingTop: undefined,
    paddingBottom: undefined,
    paddingLeft: undefined,
    paddingRight: undefined,
    overflow: undefined,
};
exports.Horizontal = {
    name: 'Horizontal Stack',
    args: {
        ...defaultArgs,
        gap: '$md',
        direction: 'row',
    },
    render: ({ gap, direction, ...rest }) => {
        console.log({ rest });
        return (react_1.default.createElement("div", { className: stories_css_1.containerClass },
            react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction, className: stories_css_1.componentClass, ...rest },
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
        ...defaultArgs,
        gap: '$md',
        direction: 'column',
    },
    render: ({ gap, direction, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction, className: stories_css_1.componentClass, ...rest },
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
        ...defaultArgs,
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    render: ({ gap, direction, alignItems, justifyContent, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent, className: stories_css_1.componentClass, ...rest },
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
        ...defaultArgs,
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    render: ({ gap, direction, alignItems, justifyContent, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent, className: stories_css_1.componentClass, ...rest },
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
        ...defaultArgs,
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        wrap: 'wrap',
    },
    render: ({ gap, direction, alignItems, justifyContent, wrap, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent, wrap: wrap, className: stories_css_1.componentClass, ...rest },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 1"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 2"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 3"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 4"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 5"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_2.itemSizeClass.$64) }, "Item 6")))),
};
//# sourceMappingURL=Stack.stories.js.map