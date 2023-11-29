"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectField = void 0;
const Form_1 = require("../../Form");
const react_1 = __importDefault(require("react"));
const SelectField = ({ disabled = false, selectProps, children, ...rest }) => {
    const { id } = selectProps;
    return (react_1.default.createElement(Form_1.FormFieldWrapper, { htmlFor: id, disabled: disabled, ...rest },
        react_1.default.createElement(Form_1.Select, { disabled: disabled, ...selectProps }, children)));
};
exports.SelectField = SelectField;
//# sourceMappingURL=SelectField.js.map