import classNames from 'classnames';
import React from 'react';
import { navAccordionLinkClass } from './NavAccordion.css';
export const NavAccordionLink = ({ asChild, children, href, ...restProps }) => {
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...restProps,
            ...children.props,
            className: navAccordionLinkClass,
        });
    }
    return (React.createElement("a", { className: classNames(navAccordionLinkClass), href: href }, children));
};
//# sourceMappingURL=NavAccordionLink.js.map