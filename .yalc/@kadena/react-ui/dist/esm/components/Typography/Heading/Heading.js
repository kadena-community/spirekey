import classNames from 'classnames';
import React from 'react';
import { fontH1Bold, fontH1Regular, fontH2Bold, fontH2Regular, fontH3Bold, fontH3Regular, fontH4Bold, fontH4Regular, fontH5Bold, fontH5Regular, fontH6Bold, fontH6Regular, } from '../../../styles';
import { colorVariants, transformVariants } from '../typography.css';
export const HEADING_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
function getHeadingClass(variant, isBold) {
    switch (variant) {
        case 'h2':
            return isBold ? fontH2Bold : fontH2Regular;
        case 'h3':
            return isBold ? fontH3Bold : fontH3Regular;
        case 'h4':
            return isBold ? fontH4Bold : fontH4Regular;
        case 'h5':
            return isBold ? fontH5Bold : fontH5Regular;
        case 'h6':
            return isBold ? fontH6Bold : fontH6Regular;
        case 'h1':
        default:
            return isBold ? fontH1Bold : fontH1Regular;
    }
}
export const Heading = ({ as = 'h1', variant = as, color = 'emphasize', transform = 'none', bold = true, children, className, ...props }) => {
    const classList = classNames(getHeadingClass(variant, bold), colorVariants[color], transformVariants[transform], className);
    const Element = HEADING_ELEMENTS.includes(as) ? as : 'h1';
    return (React.createElement(Element, { className: classList, ...props }, children));
};
//# sourceMappingURL=Heading.js.map