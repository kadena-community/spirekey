import React from 'react';
import { actionsContainerClass, titleClass } from './Notification.css';
export const NotificationHeading = ({ children, ...restProps }) => (React.createElement("h5", { className: titleClass, ...restProps }, children));
export const NotificationFooter = ({ children, }) => React.createElement("div", { className: actionsContainerClass }, children);
//# sourceMappingURL=NotificationSubComponents.js.map