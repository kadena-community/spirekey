import { sprinkles } from '../../styles/sprinkles.css';
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
export const GridRoot = ({ children, columns, margin = undefined, marginX = undefined, marginY = undefined, marginTop = undefined, marginBottom = undefined, marginLeft = undefined, marginRight = undefined, gap = '$md', padding = undefined, paddingX = undefined, paddingY = undefined, paddingTop = undefined, paddingBottom = undefined, paddingLeft = undefined, paddingRight = undefined, }) => {
    const classList = classNames(gapVariants[gap], gridContainerClass, columns && assembleColumnVariants(columns), sprinkles({
        margin,
        marginX,
        marginY,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        padding,
        paddingX,
        paddingY,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
    }));
    return (React.createElement("div", { className: classList, "data-testid": "kda-grid-root" }, children));
};
//# sourceMappingURL=GridRoot.js.map