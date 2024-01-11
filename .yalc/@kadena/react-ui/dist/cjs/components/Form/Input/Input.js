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
exports.Input = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const Form_css_1 = require("../Form.css");
const atoms_css_1 = require("../../../styles/atoms.css");
const Input_css_1 = require("./Input.css");
exports.Input = (0, react_1.forwardRef)(function Input({ outlined, leadingText, startIcon, disabled = false, children, status, className, fontFamily = 'primaryFont', ...rest }, ref) {
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(Form_css_1.baseContainerClass, {
            [Form_css_1.baseOutlinedClass]: outlined || status,
            [Input_css_1.disabledClass]: disabled,
        }, className) },
        Boolean(leadingText) && (react_1.default.createElement("div", { className: (0, classnames_1.default)(Input_css_1.leadingTextWrapperClass) },
            react_1.default.createElement("span", { className: Input_css_1.leadingTextClass }, leadingText))),
        react_1.default.createElement("div", { className: Input_css_1.inputContainerClass },
            startIcon,
            react_1.default.createElement("input", { ref: ref, className: (0, classnames_1.default)(Input_css_1.inputClass, (0, atoms_css_1.atoms)({ fontFamily })), disabled: disabled, ...rest }),
            children && react_1.default.createElement("div", { className: Input_css_1.inputChildrenClass }, children))));
});
//# sourceMappingURL=Input.js.map