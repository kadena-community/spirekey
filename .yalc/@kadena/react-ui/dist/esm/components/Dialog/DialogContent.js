import cn from 'classnames';
import React from 'react';
import { contentClass } from './Dialog.css';
export const DialogContent = ({ children, className, }) => {
    return React.createElement("div", { className: cn(contentClass, className) }, children);
};
//# sourceMappingURL=DialogContent.js.map