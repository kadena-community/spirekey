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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyButton = void 0;
const Icon_1 = require("../../Icon");
const react_1 = __importStar(require("react"));
const CopyButton_css_1 = require("./CopyButton.css");
const COPY_DURATION_TIME = 1000;
const CopyButton = ({ value, ...restProps }) => {
    const [click, setClick] = (0, react_1.useState)(false);
    const handleClick = async () => {
        await navigator.clipboard.writeText(value);
        setClick(true);
        setTimeout(() => {
            setClick(false);
        }, COPY_DURATION_TIME);
    };
    const CheckIcon = Icon_1.SystemIcon.Check;
    const ContentCopyIcon = Icon_1.SystemIcon.ContentCopy;
    return (react_1.default.createElement("button", { ...restProps, "aria-label": 'ContentCopy', onClick: handleClick, className: CopyButton_css_1.buttonClass }, click ? react_1.default.createElement(CheckIcon, { size: "sm" }) : react_1.default.createElement(ContentCopyIcon, { size: "sm" })));
};
exports.CopyButton = CopyButton;
//# sourceMappingURL=CopyButton.js.map