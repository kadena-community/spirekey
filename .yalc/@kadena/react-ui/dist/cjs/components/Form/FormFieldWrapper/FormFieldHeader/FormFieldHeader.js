"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldHeader = void 0;
const Icon_1 = require("../../../Icon");
const Label_1 = require("../../../Typography/Label/Label");
const react_1 = __importDefault(require("react"));
const FormFieldHeader_css_1 = require("./FormFieldHeader.css");
const FormFieldHeader = ({ label, htmlFor, tag, info, }) => {
    return (react_1.default.createElement("div", { className: FormFieldHeader_css_1.headerClass },
        Boolean(label) && react_1.default.createElement(Label_1.Label, { htmlFor: htmlFor }, label),
        Boolean(tag) && react_1.default.createElement("span", { className: FormFieldHeader_css_1.tagClass }, tag),
        Boolean(info) && (react_1.default.createElement("span", { className: FormFieldHeader_css_1.infoClass },
            info,
            react_1.default.createElement(Icon_1.SystemIcon.AlertCircleOutline, { size: "sm" })))));
};
exports.FormFieldHeader = FormFieldHeader;
//# sourceMappingURL=FormFieldHeader.js.map