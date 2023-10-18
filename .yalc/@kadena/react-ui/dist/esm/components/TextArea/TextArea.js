import { sprinkles } from '../../styles/sprinkles.css';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { containerClass, disabledClass, outlinedClass, textAreaClass, textAreaContainerClass, } from './TextArea.css';
export const Textarea = forwardRef(function TextArea({ outlined, disabled = false, fontFamily, ...rest }, ref) {
    return (React.createElement("div", { className: classNames(containerClass, {
            [outlinedClass]: outlined,
            [disabledClass]: disabled,
        }) },
        React.createElement("div", { className: textAreaContainerClass },
            React.createElement("textarea", { ref: ref, className: classNames(textAreaClass, sprinkles({ fontFamily })), disabled: disabled, ...rest }))));
});
//# sourceMappingURL=TextArea.js.map