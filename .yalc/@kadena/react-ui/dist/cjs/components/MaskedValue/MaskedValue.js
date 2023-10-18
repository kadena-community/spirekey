"use strict";
'use client';
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskedValue = void 0;
const Icon_1 = require("../Icon");
const react_1 = __importStar(require("react"));
const MaskedValue_css_1 = require("./MaskedValue.css");
const MaskedValue = ({ title, value, defaultVisibility = false, startUnmaskedValues = 6, endUnmaskedValues = 4, }) => {
    const [visible, setVisible] = (0, react_1.useState)(defaultVisibility);
    const toggleVisibility = () => {
        setVisible(!visible);
    };
    let maskedValue = value;
    if (startUnmaskedValues + endUnmaskedValues <= value.length - 1) {
        maskedValue = `${value.slice(0, startUnmaskedValues)}****${value.slice(-endUnmaskedValues)}`;
    }
    return (react_1.default.createElement("div", { "data-testid": "kda-masked-value" },
        react_1.default.createElement("div", { className: MaskedValue_css_1.titleContainer }, title),
        react_1.default.createElement("div", { className: MaskedValue_css_1.valueIconContainer },
            react_1.default.createElement("div", { className: MaskedValue_css_1.valueContainer }, visible ? value : maskedValue),
            visible ? (react_1.default.createElement(Icon_1.SystemIcon.EyeOffOutline, { className: MaskedValue_css_1.iconContainer, onClick: toggleVisibility })) : (react_1.default.createElement(Icon_1.SystemIcon.EyeOutline, { className: MaskedValue_css_1.iconContainer, onClick: toggleVisibility })))));
};
exports.MaskedValue = MaskedValue;
//# sourceMappingURL=MaskedValue.js.map