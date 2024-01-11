"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const react_1 = __importDefault(require("react"));
const typography_css_1 = require("../typography.css");
const Heading_1 = require("./Heading");
const meta = {
    title: 'Typography/Heading',
    component: Heading_1.Heading,
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
            options: Heading_1.HEADING_ELEMENTS,
            control: { type: 'select' },
        },
        variant: {
            options: Heading_1.HEADING_ELEMENTS,
            control: { type: 'select' },
        },
        bold: {
            options: Heading_1.HEADING_ELEMENTS,
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
    name: 'Heading',
    args: {
        as: 'h1',
        children: 'heading',
        variant: undefined,
        bold: undefined,
        color: undefined,
        transform: undefined,
    },
    render: ({ as, bold, variant, transform, children, color }) => (react_1.default.createElement(Heading_1.Heading, { as: as, variant: variant, bold: bold, color: color, transform: transform }, children)),
};
//# sourceMappingURL=Heading.stories.js.map