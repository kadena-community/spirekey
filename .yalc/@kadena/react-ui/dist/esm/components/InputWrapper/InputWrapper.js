import React from 'react';
import { InputHeader } from './InputHeader/InputHeader';
import { InputHelper } from './InputHelper/InputHelper';
import { statusVariant } from './InputWrapper.css';
export const InputWrapper = ({ status, disabled, children, label, leadingTextWidth = undefined, htmlFor, tag, info, helperText, }) => {
    const statusVal = disabled === true ? 'disabled' : status;
    return (React.createElement("div", { className: statusVal ? statusVariant[statusVal] : undefined },
        label !== undefined && (React.createElement(InputHeader, { htmlFor: htmlFor, label: label, tag: tag, info: info })),
        React.createElement("div", { className: "inputGroup" }, leadingTextWidth
            ? React.Children.map(children, (child) => {
                if (!React.isValidElement(child))
                    return null;
                const props = {
                    ...child.props,
                    leadingTextWidth,
                };
                return React.cloneElement(child, props);
            })
            : children),
        Boolean(helperText) && React.createElement(InputHelper, null, helperText)));
};
//# sourceMappingURL=InputWrapper.js.map