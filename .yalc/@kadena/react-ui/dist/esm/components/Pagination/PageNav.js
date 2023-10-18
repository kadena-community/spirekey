import { SystemIcon } from '../Icon';
import React from 'react';
import { pageNavButtonClass, pageNavLabelClass } from './Pagination.css';
export const PageNav = ({ label, direction, disabled = false, onClick, }) => {
    const isPrevious = direction === 'prev';
    const isNext = direction === 'next';
    return (React.createElement("button", { className: pageNavButtonClass, disabled: disabled, onClick: onClick },
        isPrevious ? React.createElement(SystemIcon.LeadingIcon, null) : null,
        React.createElement("span", { className: pageNavLabelClass }, label),
        isNext ? React.createElement(SystemIcon.TrailingIcon, null) : null));
};
//# sourceMappingURL=PageNav.js.map