import Logo, { logoVariants } from '../BrandLogo';
import { Link } from '../Link';
import React from 'react';
import { containerClass, logoClass } from './NavHeader.css';
export const NavHeaderContainer = ({ brand = logoVariants[0], children, }) => {
    return (React.createElement("header", { className: containerClass },
        logoVariants.includes(brand) && (React.createElement("div", { className: logoClass },
            React.createElement(Link, { href: "/", target: "_self" },
                React.createElement(Logo, { variant: brand })))),
        children));
};
//# sourceMappingURL=NavHeader.js.map