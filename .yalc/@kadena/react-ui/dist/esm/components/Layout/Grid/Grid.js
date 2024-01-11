import classNames from 'classnames';
import React from 'react';
import { Box } from '../Box';
import { containerColumnVariants, gridContainerClass } from './Grid.css';
const assembleColumnVariants = (columns) => {
    if (typeof columns === 'number') {
        return containerColumnVariants.xs[columns];
    }
    return Object.entries(columns).map(([key, value]) => {
        return containerColumnVariants[key][value];
    });
};
export const Grid = ({ className, children, columns, ...props }) => {
    const classList = classNames(gridContainerClass, columns && assembleColumnVariants(columns), className);
    return (React.createElement(Box, { className: classList, ...props }, children));
};
//# sourceMappingURL=Grid.js.map