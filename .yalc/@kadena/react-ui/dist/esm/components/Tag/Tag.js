import cn from 'classnames';
import React from 'react';
import { tagClass } from './Tag.css';
export const Tag = ({ children, className, ...restProps }) => {
    return (React.createElement("span", { className: cn(tagClass, className), ...restProps }, children));
};
//# sourceMappingURL=Tag.js.map