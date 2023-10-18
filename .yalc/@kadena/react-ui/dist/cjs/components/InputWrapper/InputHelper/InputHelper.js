"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHelper = void 0;
const Icon_1 = require("../../Icon");
const react_1 = __importDefault(require("react"));
const InputHelper_css_1 = require("./InputHelper.css");
const InputHelper = ({ children }) => {
    return (react_1.default.createElement("span", { className: InputHelper_css_1.helperClass },
        react_1.default.createElement("span", { className: InputHelper_css_1.helperIconClass },
            react_1.default.createElement(Icon_1.SystemIcon.AlertBox, { size: "sm" })),
        children));
};
exports.InputHelper = InputHelper;
//# sourceMappingURL=InputHelper.js.map