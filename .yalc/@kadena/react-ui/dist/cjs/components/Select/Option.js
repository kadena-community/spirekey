"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const react_1 = __importDefault(require("react"));
const Option = ({ children, ...rest }) => (react_1.default.createElement("option", { ...rest }, children));
exports.Option = Option;
//# sourceMappingURL=Option.js.map