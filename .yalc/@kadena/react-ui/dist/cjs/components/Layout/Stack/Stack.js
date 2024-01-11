"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
const react_1 = __importDefault(require("react"));
const Box_1 = require("../Box");
const Stack = ({ children, as = 'div', display = 'flex', ...props }) => {
    return (react_1.default.createElement(Box_1.Box, { as: as, display: display, ...props }, children));
};
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map