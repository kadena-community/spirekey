"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Button_1 = require("../Button");
const Card_1 = require("../Card");
const Layout_1 = require("../Layout");
const Typography_1 = require("../Typography");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Layout/Card',
    parameters: {
        status: {
            type: ['needsRevision'],
        },
        docs: {
            description: {
                component: 'A component used for grouping items in a card.',
            },
        },
    },
    component: Card_1.Card,
    argTypes: {
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
        fullWidth: false,
        disabled: false,
    },
    render: ({ fullWidth, disabled }) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Card_1.Card, { fullWidth: fullWidth, disabled: disabled },
                react_1.default.createElement(Layout_1.Stack, { direction: "column", gap: "$2", alignItems: "flex-start", marginBottom: "$6", maxWidth: "$maxContentWidth" },
                    react_1.default.createElement(Typography_1.Heading, { as: "h5" }, "Intro to Kadena"),
                    react_1.default.createElement(Typography_1.Text, null, "Kadena is the only platform offering a complete decentralized infrastructure for builders. Combining a revolutionary chain architecture with the tools needed for widespread adoption, your teams get the full capabilities of blockchain with the ability to go from concept to launch in days vs. months by not having to build from scratch. Learn about our core concepts.")),
                react_1.default.createElement(Button_1.Button, { title: 'Button' }, "Kadena Docs"))));
    },
};
//# sourceMappingURL=Card.stories.js.map