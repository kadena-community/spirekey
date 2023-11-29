import classnames from 'classnames';
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
export const GridItem = ({ className, children, columnSpan, rowSpan = 1, }) => {
    return (React.createElement("div", { className: classnames(gridItemClass, rowSpanVariants[rowSpan], columnSpan && assembleColumnSpanVariants(columnSpan), className) }, children));
};
//# sourceMappingURL=GridItem.js.map