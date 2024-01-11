import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { baseContainerClass, baseOutlinedClass } from '../Form.css';
import { atoms } from '../../../styles/atoms.css';
import { disabledClass, inputChildrenClass, inputClass, inputContainerClass, leadingTextClass, leadingTextWrapperClass, } from './Input.css';
export const Input = forwardRef(function Input({ outlined, leadingText, startIcon, disabled = false, children, status, className, fontFamily = 'primaryFont', ...rest }, ref) {
    return (React.createElement("div", { className: classNames(baseContainerClass, {
            [baseOutlinedClass]: outlined || status,
            [disabledClass]: disabled,
        }, className) },
        Boolean(leadingText) && (React.createElement("div", { className: classNames(leadingTextWrapperClass) },
            React.createElement("span", { className: leadingTextClass }, leadingText))),
        React.createElement("div", { className: inputContainerClass },
            startIcon,
            React.createElement("input", { ref: ref, className: classNames(inputClass, atoms({ fontFamily })), disabled: disabled, ...rest }),
            children && React.createElement("div", { className: inputChildrenClass }, children))));
});
//# sourceMappingURL=Input.js.map