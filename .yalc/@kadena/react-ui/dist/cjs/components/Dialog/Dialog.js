"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const utils_1 = require("@react-aria/utils");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const react_aria_1 = require("react-aria");
const react_stately_1 = require("react-stately");
const Icon_1 = require("../Icon");
const Modal_1 = require("../Modal/Modal");
const Dialog_context_1 = require("./Dialog.context");
const Dialog_css_1 = require("./Dialog.css");
const BaseDialog = react_1.default.forwardRef((props, ref) => {
    var _a;
    const { className, children, isDismissable = true, state, ...rest } = props;
    const dialogRef = (0, utils_1.useObjectRef)(ref);
    const { dialogProps, titleProps } = (0, react_aria_1.useDialog)({
        role: (_a = props.role) !== null && _a !== void 0 ? _a : 'dialog',
        ...rest,
    }, dialogRef);
    return (react_1.default.createElement(Dialog_context_1.DialogContext.Provider, { value: { titleProps, state } },
        react_1.default.createElement("div", { ref: dialogRef, className: (0, classnames_1.default)(Dialog_css_1.overlayClass, className), ...(0, react_aria_1.mergeProps)(rest, dialogProps) },
            typeof children === 'function' ? children(state) : children,
            isDismissable && (react_1.default.createElement("button", { className: Dialog_css_1.closeButtonClass, onClick: state.close, "aria-label": "Close Modal", title: "Close Modal" },
                react_1.default.createElement(Icon_1.SystemIcon.Close, null))))));
});
BaseDialog.displayName = 'BaseDialog';
const Dialog = ({ children, isDismissable = true, isKeyboardDismissDisabled, isOpen, defaultOpen, onOpenChange, ...props }) => {
    const state = (0, react_stately_1.useOverlayTriggerState)({
        isOpen,
        defaultOpen,
        onOpenChange,
    });
    return (react_1.default.createElement(Modal_1.Modal, { isKeyboardDismissDisabled: isKeyboardDismissDisabled, state: state },
        react_1.default.createElement(BaseDialog, { state: state, isDismissable: isDismissable, ...props }, children)));
};
exports.Dialog = Dialog;
//# sourceMappingURL=Dialog.js.map