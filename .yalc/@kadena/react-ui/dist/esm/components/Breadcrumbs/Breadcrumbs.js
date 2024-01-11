import React from 'react';
import { containerClass, iconContainer, navClass } from './Breadcrumbs.css';
export const BreadcrumbsContainer = ({ children, icon, }) => {
    return (React.createElement("nav", { className: navClass, "data-testid": "kda-breadcrumbs" },
        icon && React.createElement("span", { className: iconContainer }, icon),
        React.createElement("ul", { className: containerClass }, children)));
};
//# sourceMappingURL=Breadcrumbs.js.map