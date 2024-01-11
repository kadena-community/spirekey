import React from 'react';
import { Stack } from '../../Layout';
import { FormFieldHeader } from './FormFieldHeader/FormFieldHeader';
import { FormFieldHelper } from './FormFieldHelper/FormFieldHelper';
import { FormFieldWrapperContext } from './FormFieldWrapper.context';
import { statusVariant } from './FormFieldWrapper.css';
export const FormFieldWrapper = ({ status, disabled, children, label, leadingTextWidth = undefined, htmlFor, tag, info, helperText, }) => {
    const statusVal = disabled === true ? 'disabled' : status;
    return (React.createElement(FormFieldWrapperContext.Provider, { value: { status, leadingTextWidth } },
        React.createElement("div", { className: statusVal ? statusVariant[statusVal] : undefined },
            label !== undefined && (React.createElement(FormFieldHeader, { htmlFor: htmlFor, label: label, tag: tag, info: info })),
            React.createElement(Stack, { gap: "xs", flexDirection: "column" }, children),
            Boolean(helperText) && React.createElement(FormFieldHelper, null, helperText))));
};
//# sourceMappingURL=FormFieldWrapper.js.map