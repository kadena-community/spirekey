"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItemStory = exports.Primary = void 0;
const Grid_1 = require("../../Layout/Grid");
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const vars_css_1 = require("../../../styles/vars.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const stories_css_1 = require("../stories.css");
const Grid_css_1 = require("./Grid.css");
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
    title: 'Layout/Grid',
    parameters: {
        status: {
            type: 'releaseCandidate',
        },
        docs: {
            description: {
                component: 'The Grid component is an abstraction over css grid that provides ` and `Item` subcomponents to compose a grid of equally sized columns.<br><br><i>Note: This component does not support grid templates or columns of varying sizes.</i>',
            },
        },
    },
    argTypes: {
        overflow: {
            options: ['hidden', 'visible', 'scroll', 'auto'],
            control: {
                type: 'select',
            },
            description: 'Overflow css property.',
        },
        gap: {
            options: Object.keys(Grid_css_1.gapVariants),
            control: { type: 'select' },
            description: 'Defines the gaps (gutters) between rows and columns with pre-defined size values.',
        },
        columns: {
            control: { type: 'object' },
            description: 'Defines the number of columns.',
            options: {
                xs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                sm: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                md: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                lg: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                xl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                xxl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
        },
        columnSpan: {
            control: { type: 'object' },
            description: 'Defines the column span.',
            options: {
                xs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                sm: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                md: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                lg: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                xl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                xxl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
        },
        margin: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property with pre-defined size values.',
        },
        marginX: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property on X axis with pre-defined size values.',
        },
        marginY: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property on Y axis with pre-defined size values.',
        },
        marginTop: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top margin property with pre-defined size values.',
        },
        marginBottom: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top margin property with pre-defined size values.',
        },
        marginLeft: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for left margin property with pre-defined size values.',
        },
        marginRight: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for right margin property with pre-defined size values.',
        },
        padding: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property with pre-defined size values.',
        },
        paddingX: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property on X axis with pre-defined size values.',
        },
        paddingY: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property on Y axis with pre-defined size values.',
        },
        paddingTop: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top padding property with pre-defined size values.',
        },
        paddingBottom: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for bottom padding property with pre-defined size values.',
        },
        paddingLeft: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for left padding property with pre-defined size values.',
        },
        paddingRight: {
            options: spaceOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for right padding property with pre-defined size values.',
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
    columns: undefined,
    padding: undefined,
    paddingX: undefined,
    paddingY: undefined,
    paddingTop: undefined,
    paddingBottom: undefined,
    paddingLeft: undefined,
    paddingRight: undefined,
    overflow: undefined,
};
exports.Primary = {
    name: 'Grid',
    args: {
        ...defaultArgs,
        gap: '$xl',
        columns: {
            xs: 1,
            sm: 2,
            md: 4,
            lg: 6,
            xl: 10,
            xxl: 12,
        },
    },
    render: ({ gap, columns, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Grid_1.Grid, { gap: gap, columns: columns, className: stories_css_1.componentClass, ...rest },
            Array.from(new Array(12)).map((empty, i) => (react_1.default.createElement(Grid_1.GridItem, { key: i, className: stories_css_1.itemClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, i)))),
            react_1.default.createElement(Grid_1.GridItem, { className: stories_css_1.itemClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "2")),
            react_1.default.createElement(Grid_1.GridItem, { className: stories_css_1.itemClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "3")),
            react_1.default.createElement(Grid_1.GridItem, { className: stories_css_1.itemClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "4")),
            react_1.default.createElement(Grid_1.GridItem, { className: stories_css_1.itemClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "5")),
            react_1.default.createElement(Grid_1.GridItem, { className: stories_css_1.itemClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "6")),
            react_1.default.createElement(Grid_1.GridItem, { className: stories_css_1.itemClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "7")),
            react_1.default.createElement(Grid_1.GridItem, { className: stories_css_1.itemClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "8"))))),
};
exports.GridItemStory = {
    args: {
        ...defaultArgs,
        gap: '$xl',
        columns: 12,
        columnSpan: {
            xs: 5,
            sm: 10,
            md: 6,
            lg: 4,
            xl: 2,
            xxl: 1,
        },
    },
    render: ({ gap, columns, columnSpan, ...rest }) => (react_1.default.createElement("div", { className: stories_css_1.containerClass },
        react_1.default.createElement(Grid_1.Grid, { gap: gap, columns: columns, className: stories_css_1.componentClass, ...rest },
            react_1.default.createElement(Grid_1.GridItem, { className: (0, classnames_1.default)(stories_css_1.itemClass, (0, sprinkles_css_1.sprinkles)({ bg: '$primaryHighContrast' })), columnSpan: columnSpan }, "dynamic"),
            Array.from(new Array(12)).map((empty, i) => (react_1.default.createElement(Grid_1.GridItem, { key: i, columnSpan: 1, className: stories_css_1.itemClass }, "1")))))),
};
//# sourceMappingURL=Grid.stories.js.map