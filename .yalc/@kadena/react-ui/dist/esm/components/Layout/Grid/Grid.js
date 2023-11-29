import { sprinkles } from '../../../styles/sprinkles.css';
import classNames from 'classnames';
import React from 'react';
import { containerColumnVariants, gapVariants, gridContainerClass, } from './Grid.css';
const assembleColumnVariants = (columns) => {
    if (typeof columns === 'number') {
        return containerColumnVariants.xs[columns];
    }
    return Object.entries(columns).map(([key, value]) => {
        return containerColumnVariants[key][value];
    });
};
export const Grid = ({ className, children, columns, gap = '$md', height, margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, maxHeight, maxWidth, minHeight, minWidth, overflow, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, paddingX, paddingY, width, }) => {
    const classList = classNames(gapVariants[gap], gridContainerClass, columns && assembleColumnVariants(columns), sprinkles({
        height,
        margin,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginX,
        marginY,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        overflow,
        padding,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingX,
        paddingY,
        width,
    }), className);
    return React.createElement("div", { className: classList }, children);
};
//# sourceMappingURL=Grid.js.map