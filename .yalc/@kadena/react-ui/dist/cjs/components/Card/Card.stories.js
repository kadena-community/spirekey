"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Button_1 = require("../Button");
const Card_1 = require("../Card");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Layout/Card',
    parameters: {
        docs: {
            description: {
                component: 'A component used for grouping items in a card.',
            },
        },
    },
    component: Card_1.Card,
    argTypes: {
        stack: {
            control: {
                type: 'boolean',
            },
            description: 'If true, the component vertically stacks multiple card together and applies styles that combine them into a single card with separators.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        fullWidth: {
            control: {
                type: 'boolean',
            },
            description: 'An option to make the card span the full width of its container.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        disabled: {
            control: {
                type: 'boolean',
            },
            description: 'Disables the input and applies visual styling.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Card',
    args: {
        stack: false,
        fullWidth: false,
        disabled: false,
    },
    render: ({ stack, fullWidth, disabled }) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Card_1.Card, { stack: stack, fullWidth: fullWidth, disabled: disabled },
                react_1.default.createElement("h4", null, "Getting Started is Simple"),
                react_1.default.createElement("div", null, "Learn Kadena's core concepts & tools for development in 15 minutes"),
                react_1.default.createElement(Button_1.Button, { title: 'Button' }, "Hello World Tutorial")),
            react_1.default.createElement(Card_1.Card, { stack: stack, fullWidth: fullWidth, disabled: disabled },
                react_1.default.createElement("h4", null, "Getting Started is Simple"),
                react_1.default.createElement("div", null, "Learn Kadena's core concepts & tools for development in 15 minutes"),
                react_1.default.createElement(Button_1.Button, { title: 'Button' }, "Hello World Tutorial"))));
    },
};
//# sourceMappingURL=Card.stories.js.map