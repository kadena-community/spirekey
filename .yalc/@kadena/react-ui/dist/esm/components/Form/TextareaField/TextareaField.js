import { Textarea } from '../../Form';
import React, { forwardRef } from 'react';
import { FormFieldHeader, FormFieldHelper } from '../FormFieldWrapper';
import { statusVariant } from '../FormFieldWrapper/FormFieldWrapper.css';
export const TextareaField = forwardRef(function TextareaField({ disabled = false, id, status, tag, info, helperText, label, ...rest }, ref) {
    const statusVal = disabled === true ? 'disabled' : status;
    return (React.createElement("div", { className: statusVal ? statusVariant[statusVal] : undefined },
        label !== undefined && (React.createElement(FormFieldHeader, { htmlFor: id, label: label, tag: tag, info: info })),
        React.createElement(Textarea, { ref: ref, disabled: disabled, id: id, ...rest }),
        Boolean(helperText) && status !== 'negative' && (React.createElement(FormFieldHelper, null, helperText)),
        Boolean(helperText) && status === 'negative' && (React.createElement(FormFieldHelper, null, helperText))));
});
//# sourceMappingURL=TextareaField.js.map