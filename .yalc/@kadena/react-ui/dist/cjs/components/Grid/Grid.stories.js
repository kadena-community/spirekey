"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItem = exports.GridRoot = void 0;
const Grid_1 = require("../Grid");
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Grid_css_1 = require("./Grid.css");
const stories_css_1 = require("./stories.css");
const selectOptions = [
    undefined,
    ...Object.keys(vars_css_1.vars.sizes),
];
const meta = {
    title: 'Layout/Grid',
    parameters: {
        docs: {
            description: {
                component: 'The Grid component is an abstraction over css grid that provides `Root` and `Item` subcomponents to compose a grid of equally sized columns.<br><br><i>Note: This component does not support grid templates or columns of varying sizes.</i>',
            },
        },
    },
    component: Grid_1.Grid.Root,
    argTypes: {
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
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property with pre-defined size values.',
        },
        marginX: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property on X axis with pre-defined size values.',
        },
        marginY: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for margin property on Y axis with pre-defined size values.',
        },
        marginTop: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top margin property with pre-defined size values.',
        },
        marginBottom: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top margin property with pre-defined size values.',
        },
        marginLeft: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for left margin property with pre-defined size values.',
        },
        marginRight: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for right margin property with pre-defined size values.',
        },
        padding: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property with pre-defined size values.',
        },
        paddingX: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property on X axis with pre-defined size values.',
        },
        paddingY: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for padding property on Y axis with pre-defined size values.',
        },
        paddingTop: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for top padding property with pre-defined size values.',
        },
        paddingBottom: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for bottom padding property with pre-defined size values.',
        },
        paddingLeft: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for left padding property with pre-defined size values.',
        },
        paddingRight: {
            options: selectOptions,
            control: {
                type: 'select',
            },
            description: 'Set value for right padding property with pre-defined size values.',
        },
    },
};
exports.default = meta;
exports.GridRoot = {
    name: 'Grid',
    args: {
        gap: '$xl',
        columns: {
            xs: 1,
            sm: 2,
            md: 4,
            lg: 6,
            xl: 10,
            xxl: 12,
        },
        margin: undefined,
        marginX: undefined,
        marginY: undefined,
        marginTop: undefined,
        marginBottom: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        padding: undefined,
        paddingX: undefined,
        paddingY: undefined,
        paddingTop: undefined,
        paddingBottom: undefined,
        paddingLeft: undefined,
        paddingRight: undefined,
    },
    render: ({ gap, columns, margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight, }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Grid_1.Grid.Root, { gap: gap, columns: columns, margin: margin, marginX: marginX, marginY: marginY, marginTop: marginTop, marginBottom: marginBottom, marginLeft: marginLeft, marginRight: marginRight, padding: padding, paddingX: paddingX, paddingY: paddingY, paddingTop: paddingTop, paddingBottom: paddingBottom, paddingLeft: paddingLeft, paddingRight: paddingRight },
            Array.from(new Array(12)).map((empty, i) => (react_1.default.createElement(Grid_1.Grid.Item, { key: i },
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, i)))),
            react_1.default.createElement(Grid_1.Grid.Item, null,
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "2")),
            react_1.default.createElement(Grid_1.Grid.Item, null,
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "3")),
            react_1.default.createElement(Grid_1.Grid.Item, null,
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "4")),
            react_1.default.createElement(Grid_1.Grid.Item, null,
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "5")),
            react_1.default.createElement(Grid_1.Grid.Item, null,
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "6")),
            react_1.default.createElement(Grid_1.Grid.Item, null,
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "7")),
            react_1.default.createElement(Grid_1.Grid.Item, null,
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "8"))))),
};
exports.GridItem = {
    args: {
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
    render: ({ gap, columns, columnSpan }) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Grid_1.Grid.Root, { gap: gap, columns: columns },
            react_1.default.createElement(Grid_1.Grid.Item, { columnSpan: columnSpan },
                react_1.default.createElement("div", { className: (0, classnames_1.default)(stories_css_1.ContentClass, (0, sprinkles_css_1.sprinkles)({ bg: '$primaryAccent' })) }, "dynamic")),
            Array.from(new Array(12)).map((empty, i) => (react_1.default.createElement(Grid_1.Grid.Item, { key: i, columnSpan: 1 },
                react_1.default.createElement("div", { className: stories_css_1.ContentClass }, "1"))))))),
};
//# sourceMappingURL=Grid.stories.js.map