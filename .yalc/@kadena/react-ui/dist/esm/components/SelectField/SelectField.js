import { InputWrapper } from '../InputWrapper';
import { Select } from '../Select';
import React from 'react';
export const SelectField = ({ disabled = false, selectProps, children, ...rest }) => {
    const { id } = selectProps;
    return (React.createElement(InputWrapper, { htmlFor: id, disabled: disabled, ...rest },
        React.createElement(Select, { disabled: disabled, ...selectProps }, children)));
};
//# sourceMappingURL=SelectField.js.map