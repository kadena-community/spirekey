"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const GradientText_1 = require("../../Typography/GradientText/GradientText");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Typography/GradientText',
    component: GradientText_1.GradientText,
    parameters: {
        status: {
            type: ['stable'],
        },
    },
    argTypes: {
        children: {
            control: { type: 'text' },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'GradientText',
    args: {
        children: 'web3',
    },
    render: ({ children }) => react_1.default.createElement(GradientText_1.GradientText, null, children),
};
//# sourceMappingURL=GradientText.stories.js.map