import cn from 'classnames';
import React, { useContext } from 'react';
import { Heading } from '../Typography';
import { DialogContext } from './Dialog.context';
import { titleWrapperClass } from './Dialog.css';
export const DialogHeader = ({ children, className, }) => {
    const { titleProps } = useContext(DialogContext);
    return (React.createElement("div", { className: cn(titleWrapperClass, className), ...titleProps }, typeof children === 'string' ? (React.createElement(Heading, { as: "h3" }, children)) : (children)));
};
//# sourceMappingURL=DialogHeader.js.map