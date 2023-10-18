import classNames from 'classnames';
import React from 'react';
import { gridItemClass, itemColumnVariants, rowSpanVariants } from './Grid.css';
const assembleColumnSpanVariants = (columnSpan) => {
    if (typeof columnSpan === 'number') {
        return itemColumnVariants.xs[columnSpan];
    }
    return Object.entries(columnSpan).map(([key, value]) => {
        return itemColumnVariants[key][value];
    });
};
export const GridItem = ({ children, columnSpan, rowSpan = 1, }) => {
    const className = classNames(gridItemClass, rowSpanVariants[rowSpan], columnSpan && assembleColumnSpanVariants(columnSpan));
    return (React.createElement("div", { className: className, "data-testid": "kda-grid-item" }, children));
};
//# sourceMappingURL=GridItem.js.map