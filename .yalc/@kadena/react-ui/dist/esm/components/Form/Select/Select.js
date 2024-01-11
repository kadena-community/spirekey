import { SystemIcon } from '../../Icon';
import classNames from 'classnames';
import React, { forwardRef, useContext } from 'react';
import { baseOutlinedClass } from '../Form.css';
import { FormFieldWrapperContext } from '../FormFieldWrapper/FormFieldWrapper.context';
import { chevronIconClass, containerClass, containerClassDisabled, iconClass, selectClass, } from './Select.css';
export const Select = forwardRef(function Select({ ariaLabel, children, disabled = false, outlined = false, startIcon, ...rest }, ref) {
    const { status } = useContext(FormFieldWrapperContext);
    const ChevronDown = SystemIcon.ChevronDown;
    return (React.createElement("div", { className: classNames(containerClass, {
            [containerClassDisabled]: disabled,
            [baseOutlinedClass]: outlined || status,
        }), "data-testid": "kda-select" },
        startIcon && React.createElement("span", { className: iconClass }, startIcon),
        React.createElement("select", { "aria-label": ariaLabel, className: selectClass, disabled: disabled, ref: ref, ...rest }, children),
        React.createElement("span", { className: chevronIconClass },
            React.createElement(ChevronDown, { size: "md" }))));
});
//# sourceMappingURL=Select.js.map