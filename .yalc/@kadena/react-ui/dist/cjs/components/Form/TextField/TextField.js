"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = void 0;
const Form_1 = require("../../Form");
const react_1 = __importDefault(require("react"));
const TextField = ({ disabled = false, inputProps, status, ...rest }) => {
    const { id } = inputProps;
    return (react_1.default.createElement(Form_1.FormFieldWrapper, { htmlFor: id, disabled: disabled, status: status, ...rest },
        react_1.default.createElement(Form_1.Input, { disabled: disabled, ...inputProps })));
};
exports.TextField = TextField;
//# sourceMappingURL=TextField.js.map