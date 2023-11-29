"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const Icon_1 = require("../Icon");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const IconButton_css_1 = require("./IconButton.css");
const IconButton = ({ as = 'button', color = 'primary', variant = 'compact', href, icon, title, children, target, type, asChild = false, active = false, ...restProps }) => {
    var _a;
    const ariaLabel = (_a = restProps['aria-label']) !== null && _a !== void 0 ? _a : title;
    const renderAsAnchor = as === 'a' && href !== undefined && href !== '';
    const Icon = icon && Icon_1.SystemIcon[icon];
    const buttonVariant = () => {
        switch (variant) {
            case 'compact':
                return IconButton_css_1.compactVariant[color];
            case 'alternative':
                return IconButton_css_1.alternativeVariant[color];
            default:
                return IconButton_css_1.defaultVariant[color];
        }
    };
    const buttonClassname = (0, classnames_1.default)(buttonVariant(), {
        [IconButton_css_1.activeClass]: active,
    });
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            ...restProps,
            href,
            ariaLabel,
            type,
            ...children.props,
            className: buttonClassname,
            children: react_1.default.createElement(Icon, { size: "md" }),
        });
    }
    if (renderAsAnchor) {
        return (react_1.default.createElement("a", { className: buttonClassname, href: href, target: target, "aria-label": ariaLabel },
            react_1.default.createElement(Icon, { size: "md" })));
    }
    return (react_1.default.createElement("button", { ...restProps, className: buttonClassname, "aria-label": ariaLabel, type: type },
        react_1.default.createElement(Icon, { size: "md" })));
};
exports.IconButton = IconButton;
//# sourceMappingURL=IconButton.js.map