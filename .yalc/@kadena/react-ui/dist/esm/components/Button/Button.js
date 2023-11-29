import { SystemIcon } from '../Icon';
import cn from 'classnames';
import React from 'react';
import { activeClass, alternativeVariant, buttonLoadingClass, compactVariant, defaultVariant, iconLoadingClass, } from './Button.css';
export const Button = ({ active = false, as = 'button', asChild = false, children, color = 'primary', href, icon, iconAlign = 'right', loading, target, title = '', type, variant = 'default', ...restProps }) => {
    var _a;
    const ariaLabel = (_a = restProps['aria-label']) !== null && _a !== void 0 ? _a : title;
    const renderAsAnchor = as === 'a' && href !== undefined && href !== '';
    let Icon = icon && SystemIcon[icon];
    if (loading) {
        Icon = SystemIcon.Loading;
    }
    const buttonVariant = () => {
        switch (variant) {
            case 'compact':
                return compactVariant[color];
            case 'alternative':
                return alternativeVariant[color];
            default:
                return defaultVariant[color];
        }
    };
    const buttonClassname = cn(buttonVariant(), {
        [buttonLoadingClass]: loading,
        [activeClass]: active,
    });
    const iconClassname = cn({
        [iconLoadingClass]: loading,
    });
    const getContents = (linkContents) => (React.createElement(React.Fragment, null,
        Icon && iconAlign === 'left' && (React.createElement(Icon, { size: "md", className: iconClassname })),
        linkContents,
        Icon && iconAlign === 'right' && (React.createElement(Icon, { size: "md", className: iconClassname }))));
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...restProps,
            ...children.props,
            ariaLabel,
            children: getContents(children.props.children),
            className: buttonClassname,
        });
    }
    if (renderAsAnchor) {
        return (React.createElement("a", { "aria-label": ariaLabel, className: buttonClassname, "data-testid": "kda-button", href: href, target: target }, getContents(children)));
    }
    return (React.createElement("button", { ...restProps, "aria-label": ariaLabel, className: buttonClassname, type: type }, getContents(children)));
};
//# sourceMappingURL=Button.js.map