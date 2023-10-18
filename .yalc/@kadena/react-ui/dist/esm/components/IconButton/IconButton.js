import { SystemIcon } from '../Icon';
import classnames from 'classnames';
import React from 'react';
import { activeClass, alternativeVariant, compactVariant, defaultVariant, } from './IconButton.css';
export const IconButton = ({ as = 'button', color = 'primary', variant = 'compact', href, icon, title, children, target, type, asChild = false, active = false, ...restProps }) => {
    var _a;
    const ariaLabel = (_a = restProps['aria-label']) !== null && _a !== void 0 ? _a : title;
    const renderAsAnchor = as === 'a' && href !== undefined && href !== '';
    const Icon = icon && SystemIcon[icon];
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
    const buttonClassname = classnames(buttonVariant(), {
        [activeClass]: active,
    });
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...restProps,
            href,
            ariaLabel,
            type,
            ...children.props,
            className: buttonClassname,
            children: React.createElement(Icon, { size: "md" }),
        });
    }
    if (renderAsAnchor) {
        return (React.createElement("a", { className: buttonClassname, href: href, target: target, "aria-label": ariaLabel },
            React.createElement(Icon, { size: "md" })));
    }
    return (React.createElement("button", { ...restProps, className: buttonClassname, "aria-label": ariaLabel, "data-testid": "kda-icon-button", type: type },
        React.createElement(Icon, { size: "md" })));
};
//# sourceMappingURL=IconButton.js.map