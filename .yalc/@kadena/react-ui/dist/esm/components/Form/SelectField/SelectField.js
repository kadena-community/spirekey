import { FormFieldWrapper, Select } from '../../Form';
import React from 'react';
export const SelectField = ({ disabled = false, selectProps, children, ...rest }) => {
    const { id } = selectProps;
    return (React.createElement(FormFieldWrapper, { htmlFor: id, disabled: disabled, ...rest },
        React.createElement(Select, { disabled: disabled, ...selectProps }, children)));
};
//# sourceMappingURL=SelectField.js.map