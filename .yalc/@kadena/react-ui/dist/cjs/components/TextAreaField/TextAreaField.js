"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaField = void 0;
const InputWrapper_1 = require("../InputWrapper");
const TextArea_1 = require("../TextArea");
const react_1 = __importDefault(require("react"));
const TextAreaField = ({ disabled = false, textAreaProps, ...rest }) => {
    const { id } = textAreaProps;
    return (react_1.default.createElement(InputWrapper_1.InputWrapper, { htmlFor: id, disabled: disabled, ...rest },
        react_1.default.createElement(TextArea_1.Textarea, { disabled: disabled, ...textAreaProps })));
};
exports.TextAreaField = TextAreaField;
//# sourceMappingURL=TextAreaField.js.map