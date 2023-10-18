"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapped = exports.SpaceBetween = exports.Centered = exports.Vertical = exports.Horizontal = void 0;
const Stack_1 = require("../Stack");
const vars_css_1 = require("../../styles/vars.css");
const withCenteredStory_1 = require("../../utils/withCenteredStory");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const stories_css_1 = require("./stories.css");
const spaceOptions = [
    undefined,
    ...Object.keys(vars_css_1.vars.sizes),
];
const meta = {
    title: 'Layout/Stack',
    decorators: [withCenteredStory_1.withCenteredStory],
    parameters: {
        docs: {
            description: {
                component: 'This layout component is just a simplified abstraction on flexbox. It allows you to use basic flex properties, but does not offer the full flexibility of flexbox.',
            },
        },
    },
    component: Stack_1.Stack,
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
exports.default = meta;
exports.Horizontal = {
    name: 'Horizontal Stack',
    args: {
        gap: '$md',
        direction: 'row',
    },
    render: ({ gap, direction }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction },
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 1"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 2"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 3"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 4"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 5"),
            react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Item 6")))),
};
exports.Vertical = {
    name: 'Vertical Stack',
    args: {
        gap: '$md',
        direction: 'column',
    },
    render: ({ gap, direction }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction },
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
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    render: ({ gap, direction, alignItems, justifyContent }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$40) }, "Item 1"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$12) }, "Item 2"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$40) }, "Item 3"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$24) }, "Item 4"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$40) }, "Item 5"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$40) }, "Item 6")))),
};
exports.SpaceBetween = {
    name: 'Space Between Stack',
    args: {
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    render: ({ gap, direction, alignItems, justifyContent }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$40) }, "Item 1"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$12) }, "Item 2"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$40) }, "Item 3"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$20) }, "Item 4"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$40) }, "Item 5"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$40) }, "Item 6")))),
};
exports.Wrapped = {
    name: 'Wrapped Stack',
    args: {
        gap: '$md',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        wrap: 'wrap',
    },
    render: ({ gap, direction, alignItems, justifyContent, wrap }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Stack_1.Stack, { gap: gap, direction: direction, alignItems: alignItems, justifyContent: justifyContent, wrap: wrap },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$64) }, "Item 1"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$64) }, "Item 2"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$64) }, "Item 3"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$64) }, "Item 4"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$64) }, "Item 5"),
            react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.itemClass, stories_css_1.itemSizeClass.$64) }, "Item 6")))),
};
//# sourceMappingURL=Stack.stories.js.map