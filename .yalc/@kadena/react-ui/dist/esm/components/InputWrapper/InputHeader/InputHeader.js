import { SystemIcon } from '../../Icon';
import { Label } from '../../Typography/Label/Label';
import React from 'react';
import { headerClass, infoClass, tagClass } from './InputHeader.css';
export const InputHeader = ({ label, htmlFor, tag, info, }) => {
    return (React.createElement("div", { className: headerClass },
        Boolean(label) && React.createElement(Label, { htmlFor: htmlFor }, label),
        Boolean(tag) && React.createElement("span", { className: tagClass }, tag),
        Boolean(info) && (React.createElement("span", { className: infoClass },
            info,
            React.createElement(SystemIcon.AlertCircleOutline, { size: "sm" })))));
};
//# sourceMappingURL=InputHeader.js.map