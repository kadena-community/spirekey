"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldWrapper = void 0;
const react_1 = __importDefault(require("react"));
const Layout_1 = require("../../Layout");
const FormFieldHeader_1 = require("./FormFieldHeader/FormFieldHeader");
const FormFieldHelper_1 = require("./FormFieldHelper/FormFieldHelper");
const FormFieldWrapper_context_1 = require("./FormFieldWrapper.context");
const FormFieldWrapper_css_1 = require("./FormFieldWrapper.css");
const FormFieldWrapper = ({ status, disabled, children, label, leadingTextWidth = undefined, htmlFor, tag, info, helperText, }) => {
    const statusVal = disabled === true ? 'disabled' : status;
    return (react_1.default.createElement(FormFieldWrapper_context_1.FormFieldWrapperContext.Provider, { value: { status, leadingTextWidth } },
        react_1.default.createElement("div", { className: statusVal ? FormFieldWrapper_css_1.statusVariant[statusVal] : undefined },
            label !== undefined && (react_1.default.createElement(FormFieldHeader_1.FormFieldHeader, { htmlFor: htmlFor, label: label, tag: tag, info: info })),
            react_1.default.createElement(Layout_1.Stack, { gap: "$2", direction: "column" }, children),
            Boolean(helperText) && react_1.default.createElement(FormFieldHelper_1.FormFieldHelper, null, helperText))));
};
exports.FormFieldWrapper = FormFieldWrapper;
//# sourceMappingURL=FormFieldWrapper.js.map