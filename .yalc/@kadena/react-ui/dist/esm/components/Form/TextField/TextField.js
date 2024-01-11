import { Input } from '../../Form';
import React, { forwardRef } from 'react';
import { FormFieldHeader, FormFieldHelper } from '../FormFieldWrapper';
import { statusVariant } from '../FormFieldWrapper/FormFieldWrapper.css';
export const TextField = forwardRef(function TextField({ disabled = false, status, id, label, info, tag, helperText, ...inputProps }, ref) {
    const statusVal = disabled === true ? 'disabled' : status;
    return (React.createElement("div", { className: statusVal ? statusVariant[statusVal] : undefined },
        label !== undefined && (React.createElement(FormFieldHeader, { htmlFor: id, label: label, tag: tag, info: info })),
        React.createElement(Input, { ref: ref, disabled: disabled, id: id, ...inputProps }),
        Boolean(helperText) && status !== 'negative' && (React.createElement(FormFieldHelper, null, helperText)),
        Boolean(helperText) && status === 'negative' && (React.createElement(FormFieldHelper, null, helperText))));
});
//# sourceMappingURL=TextField.js.map