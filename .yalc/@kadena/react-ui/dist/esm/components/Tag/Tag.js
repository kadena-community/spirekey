import { SystemIcon } from '../Icon';
import React from 'react';
import { closeButtonClass, tagClass, tagLabelClass } from './Tag.css';
export const Tag = ({ children, onClose }) => {
    return (React.createElement("span", { "data-testid": "kda-tag", className: tagClass },
        React.createElement("span", { className: tagLabelClass }, children),
        onClose ? (React.createElement("button", { className: closeButtonClass, onClick: onClose },
            React.createElement(SystemIcon.Close, { size: "sm" }))) : null));
};
//# sourceMappingURL=Tag.js.map