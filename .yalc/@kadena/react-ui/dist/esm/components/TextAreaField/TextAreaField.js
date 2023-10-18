import { InputWrapper } from '../InputWrapper';
import { Textarea } from '../TextArea';
import React from 'react';
export const TextAreaField = ({ disabled = false, textAreaProps, ...rest }) => {
    const { id } = textAreaProps;
    return (React.createElement(InputWrapper, { htmlFor: id, disabled: disabled, ...rest },
        React.createElement(Textarea, { disabled: disabled, ...textAreaProps })));
};
//# sourceMappingURL=TextAreaField.js.map