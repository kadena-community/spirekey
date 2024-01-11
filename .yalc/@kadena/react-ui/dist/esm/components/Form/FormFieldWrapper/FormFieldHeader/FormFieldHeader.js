import { SystemIcon } from '../../../Icon';
import { Label } from '../../../Typography/Label/Label';
import React from 'react';
import { headerClass, infoClass, tagClass } from './FormFieldHeader.css';
export const FormFieldHeader = ({ label, htmlFor, tag, info, }) => {
    return (React.createElement("div", { className: headerClass },
        Boolean(label) && React.createElement(Label, { htmlFor: htmlFor }, label),
        Boolean(tag) && React.createElement("span", { className: tagClass }, tag),
        Boolean(info) && (React.createElement("span", { className: infoClass },
            info,
            React.createElement(SystemIcon.AlertCircleOutline, { size: "sm" })))));
};
//# sourceMappingURL=FormFieldHeader.js.map