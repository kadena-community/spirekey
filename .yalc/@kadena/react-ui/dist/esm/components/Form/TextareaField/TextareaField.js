import { FormFieldWrapper, Textarea } from '../../Form';
import React from 'react';
export const TextareaField = ({ disabled = false, textAreaProps, ...rest }) => {
    const { id } = textAreaProps;
    return (React.createElement(FormFieldWrapper, { htmlFor: id, disabled: disabled, ...rest },
        React.createElement(Textarea, { disabled: disabled, ...textAreaProps })));
};
//# sourceMappingURL=TextareaField.js.map