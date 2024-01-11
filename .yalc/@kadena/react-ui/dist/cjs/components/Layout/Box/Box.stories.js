"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Box_1 = require("../../Layout/Box");
const _storyDecorators_1 = require("../../../storyDecorators");
const react_1 = __importDefault(require("react"));
const stories_css_1 = require("../stories.css");
const storyComponents_1 = require("../storyComponents");
const meta = {
    title: 'Layout/Box',
    component: Box_1.Box,
    decorators: [_storyDecorators_1.onLayer2],
    parameters: {
        status: {
            type: 'stable',
        },
        docs: {
            description: {
                component: 'Box is the most basic building block of application layout.\n' +
                    '\nThis component accepts an `as` prop which allows the user to pass what html element the `Box` will render as well as many style attributes that are mapped to css utility classes.',
            },
        },
    },
    argTypes: storyComponents_1.sharedStoryArgTypes,
};
exports.default = meta;
exports.Primary = {
    name: 'Box - Margin',
    args: storyComponents_1.defaultBoxArgs,
    render: (props) => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Box_1.Box, { className: stories_css_1.containerClass },
            react_1.default.createElement(Box_1.Box, { ...props, className: stories_css_1.componentClass },
                react_1.default.createElement("div", { className: stories_css_1.itemClass }, "Box Content"))),
        react_1.default.createElement(storyComponents_1.Legend, { items: [
                { label: 'Margin', color: 'warning' },
                { label: 'Padding', color: 'positive' },
                { label: 'Content', color: 'info' },
            ] }))),
};
//# sourceMappingURL=Box.stories.js.map