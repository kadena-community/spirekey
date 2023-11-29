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
exports.Tooltip = void 0;
const Layout_1 = require("../Layout");
const utils_1 = require("@react-aria/utils");
const react_1 = __importStar(require("react"));
const react_aria_1 = require("react-aria");
const react_stately_1 = require("react-stately");
const Tooltip_css_1 = require("./Tooltip.css");
const Tooltip = ({ children, content, position = 'right', ...props }) => {
    const config = {
        delay: 500,
        closeDelay: 300,
        ...props,
    };
    const state = (0, react_stately_1.useTooltipTriggerState)(config);
    const ref = (0, react_1.useRef)(null);
    const { triggerProps, tooltipProps: baseTooltipProps } = (0, react_aria_1.useTooltipTrigger)(config, state, ref);
    const { tooltipProps } = (0, react_aria_1.useTooltip)(baseTooltipProps, state);
    return (react_1.default.createElement(Layout_1.Box, { position: "relative" },
        (0, react_1.cloneElement)(children, {
            ...triggerProps,
            ref: (0, utils_1.mergeRefs)(ref, children.ref),
        }),
        state.isOpen && (react_1.default.createElement("span", { className: Tooltip_css_1.tooltipPositionVariants[position], ...tooltipProps }, content))));
};
exports.Tooltip = Tooltip;
//# sourceMappingURL=Tooltip.js.map