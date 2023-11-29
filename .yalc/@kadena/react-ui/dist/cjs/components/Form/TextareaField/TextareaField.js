"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextareaField = void 0;
const Form_1 = require("../../Form");
const react_1 = __importDefault(require("react"));
const TextareaField = ({ disabled = false, textAreaProps, ...rest }) => {
    const { id } = textAreaProps;
    return (react_1.default.createElement(Form_1.FormFieldWrapper, { htmlFor: id, disabled: disabled, ...rest },
        react_1.default.createElement(Form_1.Textarea, { disabled: disabled, ...textAreaProps })));
};
exports.TextareaField = TextareaField;
//# sourceMappingURL=TextareaField.js.map