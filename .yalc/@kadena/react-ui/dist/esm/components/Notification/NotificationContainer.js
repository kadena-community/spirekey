import { SystemIcon } from '../Icon';
import classNames from 'classnames';
import React from 'react';
import { cardColorVariants, closeButtonClass, containerClass, containerWrapperClass, contentClass, descriptionClass, displayVariants, expandVariants, inlineVariants, titleClass, } from './Notification.css';
export const NotificationContainer = ({ icon, title, children, hasCloseButton = false, color = 'info', expanded = false, onClose, variant = 'standard', inline = false, }) => {
    const Icon = icon ? SystemIcon[icon] : SystemIcon.HelpCircle;
    const inlineVariantsClass = inlineVariants[inline ? 'true' : 'false'];
    const classList = classNames(containerClass, cardColorVariants[color], displayVariants[variant], expandVariants[expanded ? 'true' : 'false'], inlineVariantsClass);
    const contentClassList = classNames(contentClass, inlineVariantsClass);
    const descriptionClassList = classNames(descriptionClass, inlineVariantsClass);
    return (React.createElement("div", { className: classList },
        React.createElement("div", { className: containerWrapperClass },
            React.createElement(Icon, { size: "md" }),
            React.createElement("div", { className: contentClassList },
                title && React.createElement("span", { className: titleClass }, title),
                React.createElement("div", { className: descriptionClassList }, children)),
            hasCloseButton && (React.createElement("button", { className: closeButtonClass, onClick: onClose, "aria-label": "Close Notification" },
                React.createElement(SystemIcon.Close, { size: "md" }))))));
};
//# sourceMappingURL=NotificationContainer.js.map