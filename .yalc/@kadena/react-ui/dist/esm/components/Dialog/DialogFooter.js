import { Stack } from '../Layout';
import cn from 'classnames';
import React from 'react';
import { footerClass } from './Dialog.css';
export const DialogFooter = ({ children, className, }) => {
    return (React.createElement(Stack, { gap: "md", justifyContent: "flex-end", alignItems: "center", marginBlockStart: "xl", className: cn(footerClass, className) }, children));
};
//# sourceMappingURL=DialogFooter.js.map