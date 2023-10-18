"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonIcon = void 0;
const react_1 = __importDefault(require("react"));
const ButtonIcon = ({ icon, className }) => {
    const Icon = icon;
    return react_1.default.createElement(Icon, { size: "md", className: className });
};
exports.ButtonIcon = ButtonIcon;
//# sourceMappingURL=ButtonIcon.js.map