"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Input_1 = require("../../Input");
const Stack_1 = require("../../Stack");
const Label_1 = require("../../Typography/Label/Label");
const react_1 = __importDefault(require("react"));
const meta = {
    title: 'Typography/Label',
    component: Label_1.Label,
    argTypes: {
        children: {
            control: { type: 'text' },
        },
    },
};
exports.default = meta;
exports.Primary = {
    name: 'Label',
    args: {
        children: 'Label',
    },
    render: ({ children }) => (react_1.default.createElement(Stack_1.Stack, { alignItems: "center" },
        react_1.default.createElement(Label_1.Label, { htmlFor: "id" }, children),
        react_1.default.createElement(Input_1.Input, { id: "id", placeholder: "Input", outlined: true }))),
};
//# sourceMappingURL=Label.stories.js.map