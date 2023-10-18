import React from 'react';
import { Tr } from './Tr';
export const TBody = ({ children }) => {
    return (React.createElement("tbody", null, React.Children.map(children, (child) => {
        if (!React.isValidElement(child) ||
            (Boolean(child) && child.type !== Tr)) {
            return null;
        }
        return child;
    })));
};
//# sourceMappingURL=TBody.js.map