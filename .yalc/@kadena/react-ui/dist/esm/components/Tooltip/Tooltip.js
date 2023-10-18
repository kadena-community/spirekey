import React, { forwardRef } from 'react';
import { arrowVariants, container } from './Tooltip.css';
export const Tooltip = forwardRef(({ children, placement = 'right' }, ref) => {
    return (React.createElement("div", { className: container, ref: ref, "data-placement": placement },
        React.createElement("div", { className: arrowVariants[placement] }),
        children));
});
//# sourceMappingURL=Tooltip.js.map