"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabContent = void 0;
const react_1 = __importDefault(require("react"));
const TabContent = ({ children, selected = false, ...props }) => {
    if (!selected)
        return null;
    return react_1.default.createElement("div", { ...props }, children);
};
exports.TabContent = TabContent;
//# sourceMappingURL=TabContent.js.map