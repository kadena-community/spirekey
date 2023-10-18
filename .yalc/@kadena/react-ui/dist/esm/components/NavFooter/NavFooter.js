import { darkThemeClass } from '../../styles/vars.css';
import React from 'react';
import { containerClass } from './NavFooter.css';
export const NavFooterContainer = ({ children, darkMode = false, }) => {
    const footerContent = (React.createElement("footer", { className: containerClass, "data-testid": "kda-footer" }, children));
    if (darkMode) {
        return React.createElement("div", { className: darkThemeClass }, footerContent);
    }
    return footerContent;
};
//# sourceMappingURL=NavFooter.js.map