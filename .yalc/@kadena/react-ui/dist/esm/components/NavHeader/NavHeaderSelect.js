import { SystemIcon } from '../Icon';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { chevronIconClass, selectClass, selectContainerClass, selectContainerClassDisabled, selectIconClass, } from './NavHeader.css';
export const NavHeaderSelect = forwardRef(function Select({ ariaLabel, children, disabled = false, icon, ...rest }, ref) {
    const Icon = icon && SystemIcon[icon];
    const ChevronDown = SystemIcon.ChevronDown;
    return (React.createElement("div", { className: classNames(selectContainerClass, {
            [selectContainerClassDisabled]: disabled,
        }) },
        Icon && (React.createElement("span", { className: selectIconClass },
            React.createElement(Icon, { size: "md" }))),
        React.createElement("select", { "aria-label": ariaLabel, className: selectClass, disabled: Boolean(disabled), ref: ref, ...rest }, children),
        React.createElement("span", { className: chevronIconClass },
            React.createElement(ChevronDown, { size: "md" }))));
});
//# sourceMappingURL=NavHeaderSelect.js.map