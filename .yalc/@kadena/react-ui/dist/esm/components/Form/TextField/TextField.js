import { FormFieldWrapper, Input } from '../../Form';
import React from 'react';
export const TextField = ({ disabled = false, inputProps, status, ...rest }) => {
    const { id } = inputProps;
    return (React.createElement(FormFieldWrapper, { htmlFor: id, disabled: disabled, status: status, ...rest },
        React.createElement(Input, { disabled: disabled, ...inputProps })));
};
//# sourceMappingURL=TextField.js.map