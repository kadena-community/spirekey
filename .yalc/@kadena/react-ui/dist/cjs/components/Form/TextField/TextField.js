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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = void 0;
const Form_1 = require("../../Form");
const react_1 = __importStar(require("react"));
const FormFieldWrapper_1 = require("../FormFieldWrapper");
const FormFieldWrapper_css_1 = require("../FormFieldWrapper/FormFieldWrapper.css");
exports.TextField = (0, react_1.forwardRef)(function TextField({ disabled = false, status, id, label, info, tag, helperText, ...inputProps }, ref) {
    const statusVal = disabled === true ? 'disabled' : status;
    return (react_1.default.createElement("div", { className: statusVal ? FormFieldWrapper_css_1.statusVariant[statusVal] : undefined },
        label !== undefined && (react_1.default.createElement(FormFieldWrapper_1.FormFieldHeader, { htmlFor: id, label: label, tag: tag, info: info })),
        react_1.default.createElement(Form_1.Input, { ref: ref, disabled: disabled, id: id, ...inputProps }),
        Boolean(helperText) && status !== 'negative' && (react_1.default.createElement(FormFieldWrapper_1.FormFieldHelper, null, helperText)),
        Boolean(helperText) && status === 'negative' && (react_1.default.createElement(FormFieldWrapper_1.FormFieldHelper, null, helperText))));
});
//# sourceMappingURL=TextField.js.map