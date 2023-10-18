"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputWrapper = void 0;
const react_1 = __importDefault(require("react"));
const InputHeader_1 = require("./InputHeader/InputHeader");
const InputHelper_1 = require("./InputHelper/InputHelper");
const InputWrapper_css_1 = require("./InputWrapper.css");
const InputWrapper = ({ status, disabled, children, label, leadingTextWidth = undefined, htmlFor, tag, info, helperText, }) => {
    const statusVal = disabled === true ? 'disabled' : status;
    return (react_1.default.createElement("div", { className: statusVal ? InputWrapper_css_1.statusVariant[statusVal] : undefined },
        label !== undefined && (react_1.default.createElement(InputHeader_1.InputHeader, { htmlFor: htmlFor, label: label, tag: tag, info: info })),
        react_1.default.createElement("div", { className: "inputGroup" }, leadingTextWidth
            ? react_1.default.Children.map(children, (child) => {
                if (!react_1.default.isValidElement(child))
                    return null;
                const props = {
                    ...child.props,
                    leadingTextWidth,
                };
                return react_1.default.cloneElement(child, props);
            })
            : children),
        Boolean(helperText) && react_1.default.createElement(InputHelper_1.InputHelper, null, helperText)));
};
exports.InputWrapper = InputWrapper;
//# sourceMappingURL=InputWrapper.js.map