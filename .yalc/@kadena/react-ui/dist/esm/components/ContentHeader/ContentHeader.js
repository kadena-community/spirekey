import { SystemIcon } from '../Icon';
import { Heading, Text } from '../Typography';
import React from 'react';
import { containerClass, descriptionClass } from './ContentHeader.css';
export const ContentHeader = ({ icon, heading, description, }) => {
    const Icon = icon && SystemIcon[icon];
    return (React.createElement("div", { className: containerClass },
        React.createElement(Icon, { size: "md" }),
        React.createElement(Heading, { as: "h4" }, heading),
        description ? (React.createElement("div", { className: descriptionClass },
            React.createElement(Text, { as: "p" }, description))) : null));
};
//# sourceMappingURL=ContentHeader.js.map