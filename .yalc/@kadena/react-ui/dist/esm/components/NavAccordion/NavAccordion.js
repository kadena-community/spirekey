'use client';
import { darkThemeClass } from '../../styles/index';
import React, { useState } from 'react';
import { NavAccordionContext, initialOpenSections, } from './NavAccordion.context';
import { navAccordionWrapperClass } from './NavAccordion.css';
export const NavAccordionRoot = ({ children, linked = false, darkMode = false, }) => {
    const [openSections, setOpenSections] = useState(initialOpenSections);
    const NavElement = () => (React.createElement("nav", { className: navAccordionWrapperClass }, children));
    return (React.createElement(NavAccordionContext.Provider, { value: { openSections, setOpenSections, linked } }, darkMode ? (React.createElement("div", { className: darkThemeClass },
        React.createElement(NavElement, null))) : (React.createElement(NavElement, null))));
};
//# sourceMappingURL=NavAccordion.js.map