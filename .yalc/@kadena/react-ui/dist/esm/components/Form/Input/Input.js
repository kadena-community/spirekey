import { SystemIcon } from '../../Icon';
import classNames from 'classnames';
import React, { forwardRef, useContext } from 'react';
import { baseContainerClass, baseOutlinedClass } from '../Form.css';
import { FormFieldWrapperContext } from '../FormFieldWrapper/FormFieldWrapper.context';
import { disabledClass, inputChildrenClass, inputClass, inputContainerClass, leadingTextClass, leadingTextWidthVariant, leadingTextWrapperClass, } from './Input.css';
export const Input = forwardRef(function Input({ outlined, leadingText, icon, leadingTextWidth: propLeadingTextWidth, disabled = false, children, ...rest }, ref) {
    const { status, leadingTextWidth: wrapperLeadingTextWidth } = useContext(FormFieldWrapperContext);
    const leadingTextWidth = propLeadingTextWidth || wrapperLeadingTextWidth;
    const Icon = icon && SystemIcon[icon];
    return (React.createElement("div", { className: classNames(baseContainerClass, {
            [baseOutlinedClass]: outlined || status,
            [disabledClass]: disabled,
        }) },
        Boolean(leadingText) && (React.createElement("div", { className: classNames(leadingTextWrapperClass, leadingTextWidth && leadingTextWidthVariant[leadingTextWidth]) },
            React.createElement("span", { className: leadingTextClass }, leadingText))),
        React.createElement("div", { className: inputContainerClass },
            Icon && React.createElement(Icon, { size: "md" }),
            React.createElement("input", { ref: ref, className: inputClass, disabled: disabled, ...rest }),
            children && React.createElement("div", { className: inputChildrenClass }, children))));
});
//# sourceMappingURL=Input.js.map