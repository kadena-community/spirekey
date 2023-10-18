import cn from 'classnames';
import React from 'react';
import { boldClass, colorVariant, elementVariant, fontVariant, sizeVariant, transformVariant, } from './Text.css';
export const Text = ({ as = 'span', variant = as, font = variant === 'code' ? 'mono' : 'main', bold = false, size = 'lg', color = 'default', transform = 'none', children, }) => {
    const classList = cn(elementVariant[variant], fontVariant[font], sizeVariant[size], colorVariant[color], transformVariant[transform], { [boldClass]: bold });
    switch (as) {
        case 'p':
            return React.createElement("p", { className: classList }, children);
        case 'code':
            return React.createElement("code", { className: classList }, children);
        case 'span':
        default:
            return React.createElement("span", { className: classList }, children);
    }
};
//# sourceMappingURL=Text.js.map