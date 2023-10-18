import React from 'react';
import { Tr } from './Tr';
export const THead = ({ children }) => {
    return (React.createElement("thead", null, React.Children.map(children, (child) => {
        if (!React.isValidElement(child) ||
            (Boolean(child) && child.type !== Tr))
            return null;
        return child;
    })));
};
//# sourceMappingURL=THead.js.map