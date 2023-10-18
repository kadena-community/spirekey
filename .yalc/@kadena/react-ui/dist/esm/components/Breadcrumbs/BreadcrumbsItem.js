import React from 'react';
import { itemClass, linkClass, spanClass } from './Breadcrumbs.css';
export const BreadcrumbsItem = ({ children, href, asChild = false, }) => {
    if (asChild && React.isValidElement(children)) {
        return (React.createElement("li", { className: itemClass }, React.cloneElement(children, {
            href,
            className: linkClass,
            ...children.props,
        })));
    }
    return (React.createElement("li", { className: itemClass }, href !== undefined ? (React.createElement("a", { className: linkClass, href: href }, children)) : (React.createElement("span", { className: spanClass }, children))));
};
//# sourceMappingURL=BreadcrumbsItem.js.map