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
exports.Textarea = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const Form_css_1 = require("../Form.css");
const FormFieldWrapper_context_1 = require("../FormFieldWrapper/FormFieldWrapper.context");
const Textarea_css_1 = require("./Textarea.css");
exports.Textarea = (0, react_1.forwardRef)(function TextArea({ outlined = false, disabled = false, fontFamily, children, ...rest }, ref) {
    const { status } = (0, react_1.useContext)(FormFieldWrapper_context_1.FormFieldWrapperContext);
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(Form_css_1.baseContainerClass, Textarea_css_1.textAreaContainerClass, {
            [Form_css_1.baseOutlinedClass]: outlined || status,
            [Textarea_css_1.disabledClass]: disabled,
        }) },
        react_1.default.createElement("textarea", { ref: ref, className: (0, classnames_1.default)(Textarea_css_1.textAreaClass, (0, sprinkles_css_1.sprinkles)({ fontFamily })), disabled: disabled, ...rest }),
        children && react_1.default.createElement("div", { className: Textarea_css_1.buttonContainerClass }, children)));
});
//# sourceMappingURL=Textarea.js.map