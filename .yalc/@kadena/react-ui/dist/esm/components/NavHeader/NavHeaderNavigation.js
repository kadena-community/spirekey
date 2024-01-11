'use client';
import React, { useEffect, useState } from 'react';
import { glowClass, navListClass, navWrapperClass } from './NavHeader.css';
import { NavHeaderNavigationContext } from './NavHeaderNavigation.context';
import { NavGlow } from './svg/glow';
import useGlow from './useGlow';
export const NavHeaderNavigation = ({ children, activeHref, }) => {
    const [_activeHref, setActiveHref] = useState(activeHref);
    const { glowX, animationDuration, glowRef, navRef, setGlowPosition } = useGlow();
    useEffect(() => {
        if (activeHref !== _activeHref) {
            setActiveHref(activeHref);
        }
    }, [activeHref]);
    return (React.createElement(NavHeaderNavigationContext.Provider, { value: { setGlowPosition, activeHref: _activeHref, setActiveHref } },
        React.createElement("nav", { className: navWrapperClass, ref: navRef, "aria-label": "main", dir: "ltr" },
            React.createElement("div", { role: "none", className: glowClass, ref: glowRef, style: {
                    opacity: 1,
                    transform: `translateX(${glowX}px)`,
                    transitionDuration: `${animationDuration}ms`,
                } },
                React.createElement(NavGlow, null)),
            React.createElement("ul", { className: navListClass }, children))));
};
//# sourceMappingURL=NavHeaderNavigation.js.map