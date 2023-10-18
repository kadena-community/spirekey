import React from 'react';
import { linkClass } from './NavFooter.css';
export const NavFooterLink = ({ children, asChild = false, ...restProps }) => {
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...restProps,
            ...children.props,
            className: linkClass,
            children: children.props.children,
        });
    }
    return (React.createElement("a", { className: linkClass, ...restProps, "data-testid": "kda-footer-link-item" }, children));
};
//# sourceMappingURL=NavFooterLink.js.map