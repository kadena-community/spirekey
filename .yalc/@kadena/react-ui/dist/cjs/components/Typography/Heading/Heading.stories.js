"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Heading_1 = require("../../Typography/Heading/Heading");
const react_1 = __importDefault(require("react"));
const typography_css_1 = require("../typography.css");
const Heading_css_1 = require("./Heading.css");
const meta = {
    title: 'Typography/Heading',
    component: Heading_1.Heading,
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        as: {
            control: { type: 'select' },
        },
        variant: {
            options: Object.keys(Heading_css_1.elementVariants),
            control: { type: 'select' },
        },
        font: {
            options: Object.keys(typography_css_1.fontVariants),
            control: { type: 'radio' },
        },
        bold: {
            options: Object.keys(Heading_css_1.boldVariants),
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
        children: 'heading',
        as: 'h1',
        variant: undefined,
        font: undefined,
        bold: undefined,
        color: undefined,
        transform: undefined,
    },
    render: ({ font, bold, as, variant, transform, children, color }) => (react_1.default.createElement(Heading_1.Heading, { as: as, variant: variant, font: font, bold: bold, color: color, transform: transform }, children)),
};
//# sourceMappingURL=Heading.stories.js.map