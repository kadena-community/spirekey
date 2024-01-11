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
exports.Button = void 0;
const utils_1 = require("@react-aria/utils");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const react_aria_1 = require("react-aria");
const ProgressCircle_1 = require("../ProgressCircle/ProgressCircle");
const SharedButton_css_1 = require("./SharedButton.css");
const utils_2 = require("./utils");
function BaseButton(props, forwardedRef) {
    var _a;
    props = (0, utils_2.disableLoadingProps)(props);
    const ref = (0, utils_1.useObjectRef)(forwardedRef);
    const { buttonProps, isPressed } = (0, react_aria_1.useButton)(props, ref);
    const { hoverProps, isHovered } = (0, react_aria_1.useHover)(props);
    const { focusProps, isFocused, isFocusVisible } = (0, react_aria_1.useFocusRing)(props);
    const onlyIcon = props.icon !== undefined;
    const content = onlyIcon ? (props.icon) : (react_1.default.createElement(react_1.default.Fragment, null,
        props.startIcon,
        props.children,
        props.endIcon));
    const isLoadingAriaLiveLabel = `${typeof props.children === 'string'
        ? props.children
        : (_a = buttonProps['aria-label']) !== null && _a !== void 0 ? _a : 'is'} loading`.trim();
    return (react_1.default.createElement("button", { ...(0, utils_1.mergeProps)(buttonProps, hoverProps, focusProps), ref: ref, className: (0, classnames_1.default)((0, SharedButton_css_1.button)({
            variant: props.variant,
            color: props.color,
            isCompact: props.isCompact,
            isLoading: props.isLoading,
        }), props.className), style: props.style, title: props.title, "aria-disabled": props.isLoading || undefined, "data-disabled": props.isDisabled || undefined, "data-pressed": isPressed || undefined, "data-hovered": isHovered || undefined, "data-focused": isFocused || undefined, "data-focus-visible": isFocusVisible || undefined }, props.isLoading ? (react_1.default.createElement(react_1.default.Fragment, null,
        onlyIcon ? null : 'Loading',
        react_1.default.createElement(ProgressCircle_1.ProgressCircle, { "aria-hidden": "true", "aria-label": isLoadingAriaLiveLabel, isIndeterminate: true }))) : (content)));
}
exports.Button = (0, react_1.forwardRef)(BaseButton);
//# sourceMappingURL=NewButton.js.map