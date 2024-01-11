"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalTagItem = void 0;
const Icon_1 = require("../Icon");
const utils_1 = require("@react-aria/utils");
const react_1 = __importDefault(require("react"));
const react_aria_1 = require("react-aria");
const Tag_1 = require("./Tag");
const Tag_css_1 = require("./Tag.css");
const CloseButton = (props) => {
    const ref = react_1.default.useRef(null);
    const { buttonProps } = (0, react_aria_1.useButton)(props, ref);
    return (react_1.default.createElement("button", { className: Tag_css_1.closeButtonClass, ...buttonProps, ref: ref },
        react_1.default.createElement(Icon_1.SystemIcon.Close, { size: "sm" })));
};
const InternalTagItem = ({ children, asChild, ...props }) => {
    const { state } = props;
    const ref = react_1.default.useRef(null);
    const { focusProps, isFocusVisible } = (0, react_aria_1.useFocusRing)({ within: true });
    const { rowProps, gridCellProps, removeButtonProps, allowsRemoving } = (0, react_aria_1.useTag)(props, state, ref);
    const getContent = (content) => (react_1.default.createElement(Tag_1.Tag, { ...gridCellProps },
        content,
        allowsRemoving && react_1.default.createElement(CloseButton, { ...removeButtonProps })));
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            className: Tag_css_1.tagItemClass,
            ...children.props,
            ...rowProps,
            ...focusProps,
            'data-focus-visible': isFocusVisible,
            ref: (0, utils_1.mergeRefs)(ref, children.ref),
            children: getContent(children.props.children),
        });
    }
    return (react_1.default.createElement("div", { className: Tag_css_1.tagItemClass, ref: ref, ...rowProps, ...focusProps, "data-focus-visible": isFocusVisible }, getContent(children)));
};
exports.InternalTagItem = InternalTagItem;
//# sourceMappingURL=InternalTagItem.js.map