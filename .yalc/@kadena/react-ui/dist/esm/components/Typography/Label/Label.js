import React from 'react';
import { labelClass } from './Label.css';
export const Label = ({ htmlFor, children }) => {
    return (React.createElement("label", { htmlFor: htmlFor, className: labelClass }, children));
};
//# sourceMappingURL=Label.js.map