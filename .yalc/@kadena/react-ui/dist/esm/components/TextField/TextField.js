import { Input } from '../Input';
import { InputWrapper } from '../InputWrapper';
import React from 'react';
export const TextField = ({ disabled = false, inputProps, ...rest }) => {
    const { id } = inputProps;
    return (React.createElement(InputWrapper, { htmlFor: id, disabled: disabled, ...rest },
        React.createElement(Input, { disabled: disabled, ...inputProps })));
};
//# sourceMappingURL=TextField.js.map