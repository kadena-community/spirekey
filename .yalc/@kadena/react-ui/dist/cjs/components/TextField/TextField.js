"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = void 0;
const Input_1 = require("../Input");
const InputWrapper_1 = require("../InputWrapper");
const react_1 = __importDefault(require("react"));
const TextField = ({ disabled = false, inputProps, ...rest }) => {
    const { id } = inputProps;
    return (react_1.default.createElement(InputWrapper_1.InputWrapper, { htmlFor: id, disabled: disabled, ...rest },
        react_1.default.createElement(Input_1.Input, { disabled: disabled, ...inputProps })));
};
exports.TextField = TextField;
//# sourceMappingURL=TextField.js.map