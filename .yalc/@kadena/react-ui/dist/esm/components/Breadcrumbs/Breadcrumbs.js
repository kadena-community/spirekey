import { ProductIcon } from '../Icon';
import React from 'react';
import { containerClass, iconContainer, navClass } from './Breadcrumbs.css';
export const BreadcrumbsContainer = ({ children, icon, }) => {
    const Icon = icon && ProductIcon[icon];
    return (React.createElement("nav", { className: navClass, "data-testid": "kda-breadcrumbs" },
        Icon && (React.createElement("span", { className: iconContainer },
            React.createElement(Icon, { size: "sm" }))),
        React.createElement("ul", { className: containerClass }, children)));
};
//# sourceMappingURL=Breadcrumbs.js.map