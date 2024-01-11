"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Label_css_1 = require("./Label.css");
const Label = ({ children, className, ...props }) => {
    return (react_1.default.createElement("label", { className: (0, classnames_1.default)(Label_css_1.labelClass, className), ...props }, children));
};
exports.Label = Label;
//# sourceMappingURL=Label.js.map