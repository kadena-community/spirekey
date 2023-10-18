"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const react_1 = __importDefault(require("react"));
const Label_css_1 = require("./Label.css");
const Label = ({ htmlFor, children }) => {
    return (react_1.default.createElement("label", { htmlFor: htmlFor, className: Label_css_1.labelClass }, children));
};
exports.Label = Label;
//# sourceMappingURL=Label.js.map