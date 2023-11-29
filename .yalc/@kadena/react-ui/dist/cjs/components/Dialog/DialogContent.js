"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogContent = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Dialog_css_1 = require("./Dialog.css");
const DialogContent = ({ children, className, }) => {
    return react_1.default.createElement("div", { className: (0, classnames_1.default)(Dialog_css_1.contentClass, className) }, children);
};
exports.DialogContent = DialogContent;
//# sourceMappingURL=DialogContent.js.map