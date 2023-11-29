import { Close, Information } from '../Icon/System/SystemIcon';
import { Box } from '../Layout';
import classNames from 'classnames';
import React, { useState } from 'react';
import { cardColorVariants, closeButtonClass, containerClass, contentClass, displayVariants, iconClass, } from './Notification.css';
export const Notification = ({ children, hasCloseButton = false, color = 'info', styleVariant = 'bordered', onClose, icon, role, }) => {
    const [isClosed, setIsClosed] = useState(false);
    const classList = classNames(containerClass, cardColorVariants[color], displayVariants[styleVariant]);
    if (isClosed)
        return null;
    return (React.createElement("div", { className: classList, role: role },
        React.createElement(Box, { flexShrink: 0 }, icon ? (React.createElement("span", { className: iconClass }, icon)) : (React.createElement(Information, { size: "md" }))),
        React.createElement("div", { className: contentClass }, children),
        hasCloseButton && (React.createElement("button", { className: closeButtonClass, onClick: () => {
                setIsClosed(true);
                onClose === null || onClose === void 0 ? void 0 : onClose();
            }, "aria-label": "Close Notification" },
            React.createElement(Close, { size: "md" })))));
};
//# sourceMappingURL=Notification.js.map