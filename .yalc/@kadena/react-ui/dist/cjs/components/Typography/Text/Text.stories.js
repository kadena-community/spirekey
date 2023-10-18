"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Text_1 = require("../../Typography/Text/Text");
const react_1 = __importDefault(require("react"));
const Text_css_1 = require("./Text.css");
const meta = {
    title: 'Typography/Text',
    component: Text_1.Text,
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        as: {
            control: { type: 'select' },
        },
        variant: {
            options: Object.keys(Text_css_1.elementVariant),
            control: { type: 'select' },
        },
        size: {
            options: Object.keys(Text_css_1.sizeVariant),
            control: { type: 'radio' },
        },
        font: {
            options: Object.keys(Text_css_1.fontVariant),
            control: { type: 'radio' },
        },
        bold: {
            control: { type: 'boolean' },
        },
        color: {
            options: Object.keys(Text_css_1.colorVariant),
            control: { type: 'select' },
        },
        transform: {
            options: Object.keys(Text_css_1.transformVariant),
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
        size: undefined,
        font: undefined,
        bold: undefined,
        color: undefined,
        transform: undefined,
    },
    render: ({ font, bold, size, as, variant, transform, children, color }) => (react_1.default.createElement(Text_1.Text, { font: font, bold: bold, size: size, as: as, variant: variant, transform: transform, color: color }, children)),
};
//# sourceMappingURL=Text.stories.js.map