"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogFooter = void 0;
const Layout_1 = require("../Layout");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Dialog_css_1 = require("./Dialog.css");
const DialogFooter = ({ children, className, }) => {
    return (react_1.default.createElement(Layout_1.Stack, { gap: "md", justifyContent: "flex-end", alignItems: "center", marginBlockStart: "xl", className: (0, classnames_1.default)(Dialog_css_1.footerClass, className) }, children));
};
exports.DialogFooter = DialogFooter;
//# sourceMappingURL=DialogFooter.js.map