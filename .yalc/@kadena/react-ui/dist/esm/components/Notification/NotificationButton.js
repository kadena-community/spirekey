import { SystemIcon } from '../Icon';
import React from 'react';
import { actionButtonColorVariants } from './Notification.css';
export const NotificationButton = ({ icon, color, onClick, children, }) => {
    const Icon = icon && SystemIcon[icon];
    return (React.createElement("button", { onClick: onClick, className: actionButtonColorVariants[color] },
        children,
        React.createElement(Icon, { size: "md" })));
};
//# sourceMappingURL=NotificationButton.js.map