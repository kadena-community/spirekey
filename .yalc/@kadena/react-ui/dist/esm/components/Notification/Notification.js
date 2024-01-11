import { Close, Information } from '../Icon/System/SystemIcon';
import React, { useState } from 'react';
import { closeButtonClass, contentClass, iconClass, notificationRecipe, } from './Notification.css';
export const Notification = ({ children, isDismissable = false, intent, displayStyle, onDismiss, icon, role, }) => {
    const [isDismissed, setIsDismissed] = useState(false);
    if (isDismissed)
        return null;
    return (React.createElement("div", { className: notificationRecipe({
            intent,
            displayStyle,
        }), role: role },
        React.createElement("span", { className: iconClass }, icon ? icon : React.createElement(Information, { size: "md" })),
        React.createElement("div", { className: contentClass }, children),
        isDismissable && (React.createElement("button", { className: closeButtonClass, onClick: () => {
                setIsDismissed(true);
                onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
            }, "aria-label": "Close Notification" },
            React.createElement(Close, { size: "md" })))));
};
//# sourceMappingURL=Notification.js.map