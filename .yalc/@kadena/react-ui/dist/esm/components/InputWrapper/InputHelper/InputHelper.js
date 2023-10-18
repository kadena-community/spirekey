import { SystemIcon } from '../../Icon';
import React from 'react';
import { helperClass, helperIconClass } from './InputHelper.css';
export const InputHelper = ({ children }) => {
    return (React.createElement("span", { className: helperClass },
        React.createElement("span", { className: helperIconClass },
            React.createElement(SystemIcon.AlertBox, { size: "sm" })),
        children));
};
//# sourceMappingURL=InputHelper.js.map