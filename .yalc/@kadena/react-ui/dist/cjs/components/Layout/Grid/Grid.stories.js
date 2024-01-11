"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItemStory = exports.Primary = void 0;
const Grid_1 = require("../../Layout/Grid");
const _storyDecorators_1 = require("../../../storyDecorators");
const atoms_css_1 = require("../../../styles/atoms.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const stories_css_1 = require("../stories.css");
const storyComponents_1 = require("../storyComponents");
const meta = {
    title: 'Layout/Grid',
    component: Grid_1.Grid,
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
                component: 'The Grid component is an abstraction over css grid that provides `Grid` and `GridItem` components to compose a grid of equally sized columns.<br><br><i>Note: This component does not support grid templates or columns of varying sizes.</i>',
            },
        },
    },
    argTypes: {
        ...storyComponents_1.sharedStoryArgTypes,
        columns: {
            control: { type: 'object' },
            description: 'Defines the number of columns.',
        },
        columnSpan: {
            control: { type: 'object' },
            description: 'Defines the column span.',
        },
    },
};
exports.default = meta;
const { display, flex, alignItems, flexDirection, justifyContent, ...defaultGridArgs } = storyComponents_1.defaultBoxArgs;
exports.Primary = {
    name: 'Grid',
    args: {
        ...defaultGridArgs,
        gap: 'xl',
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
        react_1.default.createElement(Grid_1.Grid, { gap: gap, columns: columns, className: stories_css_1.componentClass, ...rest }, Array.from(new Array(12)).map((empty, i) => (react_1.default.createElement(Grid_1.GridItem, { key: i, className: stories_css_1.itemClass }, i)))))),
};
exports.GridItemStory = {
    args: {
        ...defaultGridArgs,
        gap: 'xl',
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
            react_1.default.createElement(Grid_1.GridItem, { className: (0, classnames_1.default)(stories_css_1.itemClass, (0, atoms_css_1.atoms)({ backgroundColor: 'brand.secondary.default' })), columnSpan: columnSpan }, "dynamic"),
            Array.from(new Array(12)).map((empty, i) => (react_1.default.createElement(Grid_1.GridItem, { key: i, columnSpan: 1, className: stories_css_1.itemClass }, "1")))))),
};
//# sourceMappingURL=Grid.stories.js.map