"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientText = void 0;
const react_1 = __importDefault(require("react"));
const GradientText_css_1 = require("./GradientText.css");
const GradientText = ({ children }) => {
    return react_1.default.createElement("span", { className: GradientText_css_1.gradientTextClass }, children);
};
exports.GradientText = GradientText;
//# sourceMappingURL=GradientText.js.map