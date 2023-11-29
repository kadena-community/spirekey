import React from 'react';
export const TabContent = ({ children, selected = false, ...props }) => {
    if (!selected)
        return null;
    return React.createElement("div", { ...props }, children);
};
//# sourceMappingURL=TabContent.js.map