import cn from 'classnames';
import React from 'react';
import { bodyBaseBold, bodyBaseRegular, bodySmallBold, bodySmallRegular, bodySmallestBold, bodySmallestRegular, codeBaseBold, codeBaseRegular, codeSmallBold, codeSmallRegular, codeSmallestBold, codeSmallestRegular, } from '../../../styles';
import { colorVariants, transformVariants } from '../typography.css';
export const TEXT_ELEMENTS = ['p', 'span', 'code'];
function getFontClass(variant, isBold, type) {
    if (type === 'code' && variant === 'smallest') {
        return isBold ? codeSmallestBold : codeSmallestRegular;
    }
    if (type === 'code' && variant === 'small') {
        return isBold ? codeSmallBold : codeSmallRegular;
    }
    if (type === 'code' && variant === 'base') {
        return isBold ? codeBaseBold : codeBaseRegular;
    }
    if (variant === 'smallest') {
        return isBold ? bodySmallestBold : bodySmallestRegular;
    }
    if (variant === 'small') {
        return isBold ? bodySmallBold : bodySmallRegular;
    }
    return isBold ? bodyBaseBold : bodyBaseRegular;
}
export const Text = ({ as = 'span', variant = 'base', bold = false, color = 'default', transform = 'none', children, className, ...props }) => {
    const classList = cn(getFontClass(variant, bold, as), colorVariants[color], transformVariants[transform], className);
    const Element = TEXT_ELEMENTS.includes(as) ? as : 'span';
    return (React.createElement(Element, { className: classList, ...props }, children));
};
//# sourceMappingURL=Text.js.map