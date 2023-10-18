import classnames from 'classnames';
import React from 'react';
import { SystemIcon } from '..';
import { blockLinkClass, linkContainerClass } from './Link.css';
export const Link = ({ asChild = false, block = false, children, icon, iconAlign = 'left', ...restProps }) => {
    const Icon = icon && SystemIcon[icon];
    const linkClasses = classnames(linkContainerClass, {
        [blockLinkClass]: block,
    });
    const getContents = (linkContents) => (React.createElement(React.Fragment, null,
        Icon && iconAlign === 'left' && React.createElement(Icon, { size: "md" }),
        linkContents,
        Icon && iconAlign === 'right' && React.createElement(Icon, { size: "md" })));
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...restProps,
            ...children.props,
            className: linkClasses,
            children: getContents(children.props.children),
        });
    }
    return (React.createElement("a", { className: linkClasses, ...restProps }, getContents(children)));
};
//# sourceMappingURL=Link.js.map