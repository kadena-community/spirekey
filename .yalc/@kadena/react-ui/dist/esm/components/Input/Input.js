import { SystemIcon } from '../Icon';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { containerClass, disabledClass, inputClass, inputContainerClass, leadingTextClass, leadingTextWidthVariant, leadingTextWrapperClass, outlinedClass, } from './Input.css';
export const Input = forwardRef(function Input({ outlined, leadingText, leadingTextWidth, leftIcon, rightIcon, disabled = false, ...rest }, ref) {
    const RightIcon = rightIcon && SystemIcon[rightIcon];
    const LeftIcon = leftIcon && SystemIcon[leftIcon];
    return (React.createElement("div", { className: classNames(containerClass, {
            [outlinedClass]: outlined,
            [disabledClass]: disabled,
        }), "data-testid": "kda-input" },
        Boolean(leadingText) && (React.createElement("div", { className: classNames(leadingTextWrapperClass, leadingTextWidth && leadingTextWidthVariant[leadingTextWidth]) },
            React.createElement("span", { className: leadingTextClass }, leadingText))),
        React.createElement("div", { className: inputContainerClass },
            LeftIcon && React.createElement(LeftIcon, { size: "md" }),
            React.createElement("input", { ref: ref, className: inputClass, disabled: disabled, ...rest }),
            RightIcon && React.createElement(RightIcon, { size: "md" }))));
});
//# sourceMappingURL=Input.js.map