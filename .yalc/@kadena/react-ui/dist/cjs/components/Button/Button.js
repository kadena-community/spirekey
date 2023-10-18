"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const Icon_1 = require("../Icon");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Button_css_1 = require("./Button.css");
const Button = ({ active = false, as = 'button', asChild = false, children, color = 'primary', href, icon, iconAlign = 'right', loading, target, title = '', type, variant = 'default', ...restProps }) => {
    var _a;
    const ariaLabel = (_a = restProps['aria-label']) !== null && _a !== void 0 ? _a : title;
    const renderAsAnchor = as === 'a' && href !== undefined && href !== '';
    let Icon = icon && Icon_1.SystemIcon[icon];
    if (loading) {
        Icon = Icon_1.SystemIcon.Loading;
    }
    const buttonVariant = () => {
        switch (variant) {
            case 'compact':
                return Button_css_1.compactVariant[color];
            case 'alternative':
                return Button_css_1.alternativeVariant[color];
            default:
                return Button_css_1.defaultVariant[color];
        }
    };
    const buttonClassname = (0, classnames_1.default)(buttonVariant(), {
        [Button_css_1.buttonLoadingClass]: loading,
        [Button_css_1.activeClass]: active,
    });
    const iconClassname = (0, classnames_1.default)({
        [Button_css_1.iconLoadingClass]: loading,
    });
    const getContents = (linkContents) => (react_1.default.createElement(react_1.default.Fragment, null,
        Icon && iconAlign === 'left' && (react_1.default.createElement(Icon, { size: "md", className: iconClassname })),
        linkContents,
        Icon && iconAlign === 'right' && (react_1.default.createElement(Icon, { size: "md", className: iconClassname }))));
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            ...restProps,
            ...children.props,
            ariaLabel,
            children: getContents(children.props.children),
            className: buttonClassname,
        });
    }
    if (renderAsAnchor) {
        return (react_1.default.createElement("a", { "aria-label": ariaLabel, className: buttonClassname, "data-testid": "kda-button", href: href, target: target }, getContents(children)));
    }
    return (react_1.default.createElement("button", { ...restProps, "aria-label": ariaLabel, className: buttonClassname, "data-testid": "kda-button", type: type }, getContents(children)));
};
exports.Button = Button;
//# sourceMappingURL=Button.js.map