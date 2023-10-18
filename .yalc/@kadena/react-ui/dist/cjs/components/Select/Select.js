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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const Icon_1 = require("../Icon");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const Select_css_1 = require("./Select.css");
exports.Select = (0, react_1.forwardRef)(function Select({ ariaLabel, children, disabled = false, icon, ...rest }, ref) {
    const Icon = icon && Icon_1.SystemIcon[icon];
    const ChevronDown = Icon_1.SystemIcon.ChevronDown;
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(Select_css_1.containerClass, {
            [Select_css_1.containerClassDisabled]: disabled,
        }), "data-testid": "kda-select" },
        Icon && (react_1.default.createElement("span", { className: Select_css_1.iconClass },
            react_1.default.createElement(Icon, { size: "md" }))),
        react_1.default.createElement("select", { "aria-label": ariaLabel, className: Select_css_1.selectClass, disabled: disabled, ref: ref, ...rest }, children),
        react_1.default.createElement("span", { className: Select_css_1.chevronIconClass },
            react_1.default.createElement(ChevronDown, { size: "md" }))));
});
//# sourceMappingURL=Select.js.map