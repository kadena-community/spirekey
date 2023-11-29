import className from 'classnames';
import React from 'react';
import { containerClass, disabledClass, fullWidthClass } from './Card.css';
export const Card = ({ children, fullWidth, disabled }) => {
    const classList = className(containerClass, {
        [fullWidthClass]: fullWidth,
        [disabledClass]: disabled,
    });
    return React.createElement("div", { className: classList }, children);
};
//# sourceMappingURL=Card.js.map