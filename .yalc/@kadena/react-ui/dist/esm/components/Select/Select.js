import { SystemIcon } from '../Icon';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { chevronIconClass, containerClass, containerClassDisabled, iconClass, selectClass, } from './Select.css';
export const Select = forwardRef(function Select({ ariaLabel, children, disabled = false, icon, ...rest }, ref) {
    const Icon = icon && SystemIcon[icon];
    const ChevronDown = SystemIcon.ChevronDown;
    return (React.createElement("div", { className: classNames(containerClass, {
            [containerClassDisabled]: disabled,
        }), "data-testid": "kda-select" },
        Icon && (React.createElement("span", { className: iconClass },
            React.createElement(Icon, { size: "md" }))),
        React.createElement("select", { "aria-label": ariaLabel, className: selectClass, disabled: disabled, ref: ref, ...rest }, children),
        React.createElement("span", { className: chevronIconClass },
            React.createElement(ChevronDown, { size: "md" }))));
});
//# sourceMappingURL=Select.js.map