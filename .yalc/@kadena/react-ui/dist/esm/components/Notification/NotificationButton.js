import React from 'react';
import { actionButtonColorVariants } from './Notification.css';
export const NotificationButton = ({ color, onClick, children, }) => {
    return (React.createElement("button", { onClick: onClick, className: actionButtonColorVariants[color] }, children));
};
//# sourceMappingURL=NotificationButton.js.map