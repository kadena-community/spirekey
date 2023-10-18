import React from 'react';
export const TabContent = ({ children, selected = false, }) => {
    if (!selected)
        return null;
    return React.createElement("div", null, children);
};
//# sourceMappingURL=TabContent.js.map