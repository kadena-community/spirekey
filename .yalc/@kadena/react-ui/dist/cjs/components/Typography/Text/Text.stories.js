"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const react_1 = __importDefault(require("react"));
const typography_css_1 = require("../typography.css");
const Text_1 = require("./Text");
const meta = {
    title: 'Typography/Text',
    component: Text_1.Text,
    parameters: {
        status: {
            type: ['needsRevision'],
        },
    },
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        as: {
            control: { type: 'select' },
        },
        variant: {
            options: ['small', 'smallest', 'base'],
            control: { type: 'select' },
        },
        bold: {
            control: { type: 'boolean' },
        },
        color: {
            options: Object.keys(typography_css_1.colorVariants),
            control: { type: 'select' },
        },
        transform: {
            options: Object.keys(typography_css_1.transformVariants),
            control: { type: 'radio' },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Text',
    args: {
        children: 'text',
        as: 'span',
        variant: undefined,
        bold: undefined,
        color: undefined,
        transform: undefined,
    },
    render: ({ bold, as, variant, transform, children, color }) => (react_1.default.createElement(Text_1.Text, { bold: bold, as: as, variant: variant, transform: transform, color: color }, children)),
};
//# sourceMappingURL=Text.stories.js.map