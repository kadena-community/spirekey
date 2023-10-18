import React from 'react';
import { SystemIcon } from '..';
import { iconButtonClass, iconTextClass } from './NavFooter.css';
export const NavFooterIconButton = ({ icon, onClick, text, }) => {
    const Icon = icon && SystemIcon[icon];
    return (React.createElement("button", { className: iconButtonClass, onClick: onClick, "data-testid": "kda-footer-icon-item" },
        text !== undefined ? (React.createElement("span", { className: iconTextClass }, text)) : null,
        React.createElement(Icon, { size: "sm", color: "inherit" })));
};
//# sourceMappingURL=NavFooterIconButton.js.map