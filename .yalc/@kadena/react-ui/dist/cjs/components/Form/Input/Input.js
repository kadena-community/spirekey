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
const Icon_1 = require("../../Icon");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const Form_css_1 = require("../Form.css");
const FormFieldWrapper_context_1 = require("../FormFieldWrapper/FormFieldWrapper.context");
const Input_css_1 = require("./Input.css");
exports.Input = (0, react_1.forwardRef)(function Input({ outlined, leadingText, icon, leadingTextWidth: propLeadingTextWidth, disabled = false, children, ...rest }, ref) {
    const { status, leadingTextWidth: wrapperLeadingTextWidth } = (0, react_1.useContext)(FormFieldWrapper_context_1.FormFieldWrapperContext);
    const leadingTextWidth = propLeadingTextWidth || wrapperLeadingTextWidth;
    const Icon = icon && Icon_1.SystemIcon[icon];
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(Form_css_1.baseContainerClass, {
            [Form_css_1.baseOutlinedClass]: outlined || status,
            [Input_css_1.disabledClass]: disabled,
        }) },
        Boolean(leadingText) && (react_1.default.createElement("div", { className: (0, classnames_1.default)(Input_css_1.leadingTextWrapperClass, leadingTextWidth && Input_css_1.leadingTextWidthVariant[leadingTextWidth]) },
            react_1.default.createElement("span", { className: Input_css_1.leadingTextClass }, leadingText))),
        react_1.default.createElement("div", { className: Input_css_1.inputContainerClass },
            Icon && react_1.default.createElement(Icon, { size: "md" }),
            react_1.default.createElement("input", { ref: ref, className: Input_css_1.inputClass, disabled: disabled, ...rest }),
            children && react_1.default.createElement("div", { className: Input_css_1.inputChildrenClass }, children))));
});
//# sourceMappingURL=Input.js.map