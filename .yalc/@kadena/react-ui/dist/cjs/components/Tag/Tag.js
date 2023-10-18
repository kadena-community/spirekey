"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const Icon_1 = require("../Icon");
const react_1 = __importDefault(require("react"));
const Tag_css_1 = require("./Tag.css");
const Tag = ({ children, onClose }) => {
    return (react_1.default.createElement("span", { "data-testid": "kda-tag", className: Tag_css_1.tagClass },
        react_1.default.createElement("span", { className: Tag_css_1.tagLabelClass }, children),
        onClose ? (react_1.default.createElement("button", { className: Tag_css_1.closeButtonClass, onClick: onClose },
            react_1.default.createElement(Icon_1.SystemIcon.Close, { size: "sm" }))) : null));
};
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map