import { Select } from '../../Form';
import React, { forwardRef } from 'react';
import { FormFieldHeader, FormFieldHelper } from '../FormFieldWrapper';
import { statusVariant } from '../FormFieldWrapper/FormFieldWrapper.css';
export const SelectField = forwardRef(function SelectField({ disabled = false, id, children, helperText, label, status, tag, info, ...rest }, ref) {
    const statusVal = disabled === true ? 'disabled' : status;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: statusVal ? statusVariant[statusVal] : undefined },
            label !== undefined && (React.createElement(FormFieldHeader, { htmlFor: id, label: label, tag: tag, info: info })),
            React.createElement(Select, { ref: ref, id: id, disabled: disabled, ...rest }, children),
            Boolean(helperText) && status !== 'negative' && (React.createElement(FormFieldHelper, null, helperText)),
            Boolean(helperText) && status === 'negative' && (React.createElement(FormFieldHelper, null, helperText)))));
});
//# sourceMappingURL=SelectField.js.map