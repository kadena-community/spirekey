import cn from 'classnames';
import React from 'react';
import { labelClass } from './Label.css';
export const Label = ({ children, className, ...props }) => {
    return (React.createElement("label", { className: cn(labelClass, className), ...props }, children));
};
//# sourceMappingURL=Label.js.map