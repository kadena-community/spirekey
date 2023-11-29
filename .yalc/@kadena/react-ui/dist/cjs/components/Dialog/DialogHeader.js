"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogHeader = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const Typography_1 = require("../Typography");
const Dialog_context_1 = require("./Dialog.context");
const Dialog_css_1 = require("./Dialog.css");
const DialogHeader = ({ children, className, }) => {
    const { titleProps } = (0, react_1.useContext)(Dialog_context_1.DialogContext);
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(Dialog_css_1.titleWrapperClass, className), ...titleProps }, typeof children === 'string' ? (react_1.default.createElement(Typography_1.Heading, { as: "h3" }, children)) : (children)));
};
exports.DialogHeader = DialogHeader;
//# sourceMappingURL=DialogHeader.js.map