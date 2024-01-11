import React from 'react';
import { actionButtonIconClass, actionButtonIntentVariants, } from './Notification.css';
export const NotificationButton = ({ intent, onClick, children, icon, }) => {
    return (React.createElement("button", { onClick: onClick, className: actionButtonIntentVariants[intent] },
        children,
        React.createElement("span", { className: actionButtonIconClass }, icon)));
};
//# sourceMappingURL=NotificationButton.js.map