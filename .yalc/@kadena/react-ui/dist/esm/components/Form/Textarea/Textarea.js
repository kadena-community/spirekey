import { atoms } from '../../../styles/atoms.css';
import classNames from 'classnames';
import React, { forwardRef, useContext } from 'react';
import { baseContainerClass, baseOutlinedClass } from '../Form.css';
import { FormFieldWrapperContext } from '../FormFieldWrapper/FormFieldWrapper.context';
import { buttonContainerClass, disabledClass, textAreaClass, textAreaContainerClass, } from './Textarea.css';
export const Textarea = forwardRef(function TextArea({ outlined = false, disabled = false, fontFamily, children, ...rest }, ref) {
    const { status } = useContext(FormFieldWrapperContext);
    return (React.createElement("div", { className: classNames(baseContainerClass, textAreaContainerClass, {
            [baseOutlinedClass]: outlined || status,
            [disabledClass]: disabled,
        }) },
        React.createElement("textarea", { ref: ref, className: classNames(textAreaClass, atoms({ fontFamily })), disabled: disabled, ...rest }),
        children && React.createElement("div", { className: buttonContainerClass }, children)));
});
//# sourceMappingURL=Textarea.js.map