import { SystemIcon } from '../../../Icon';
import React from 'react';
import { helperClass, helperIconClass } from './FormFieldHelper.css';
export const FormFieldHelper = ({ children }) => {
    return (React.createElement("span", { className: helperClass },
        React.createElement("span", { className: helperIconClass },
            React.createElement(SystemIcon.AlertBox, { size: "sm" })),
        children));
};
//# sourceMappingURL=FormFieldHelper.js.map