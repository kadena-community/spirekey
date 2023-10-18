'use client';
import classNames from 'classnames';
import React, { useContext, useEffect, useRef } from 'react';
import { activeLinkClass, linkClass } from './NavHeader.css';
import { NavHeaderNavigationContext } from './NavHeaderNavigation.context';
function hasPath(path, basePath) {
    return path.indexOf(basePath) === 0;
}
export const NavHeaderLink = ({ children, onClick, asChild = false, href, ...restProps }) => {
    const ref = useRef(null);
    const { setGlowPosition, setActiveHref, activeHref } = useContext(NavHeaderNavigationContext);
    const className = classNames(linkClass, {
        [activeLinkClass]: activeHref ? hasPath(activeHref, href) : false,
    });
    useEffect(() => {
        if (activeHref && hasPath(activeHref, href) && ref.current) {
            setGlowPosition(ref.current.getBoundingClientRect());
        }
    }, [activeHref, href, setGlowPosition]);
    const _onClick = (e) => {
        setGlowPosition(e.currentTarget.getBoundingClientRect());
        setActiveHref(href);
        if (onClick)
            onClick(e);
    };
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...restProps,
            href,
            ...children.props,
            children: children.props.children,
            className: className,
            onClick: _onClick,
            ref,
        });
    }
    return (React.createElement("li", null,
        React.createElement("a", { ref: ref, className: className, onClick: _onClick, href: href, ...restProps }, children)));
};
//# sourceMappingURL=NavHeaderLink.js.map