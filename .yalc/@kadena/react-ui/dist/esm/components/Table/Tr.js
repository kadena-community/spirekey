import { IconButton } from '../IconButton';
import React from 'react';
import { linkButtonClass, trClass } from './Table.css';
import { Td } from './Td';
import { Th } from './Th';
export const Tr = ({ children, url, onClick }) => {
    return (React.createElement("tr", { className: trClass },
        React.Children.map(children, (child) => {
            if (!React.isValidElement(child) ||
                (Boolean(child) && child.type !== Th && child.type !== Td))
                return null;
            return child;
        }),
        url !== undefined ? (React.createElement("td", { className: linkButtonClass },
            React.createElement(IconButton, { as: "a", href: url, title: url, icon: "TrailingIcon" }))) : onClick !== undefined ? (React.createElement("td", { className: linkButtonClass },
            React.createElement(IconButton, { as: "button", title: "", onClick: onClick, icon: "TrailingIcon" }))) : ('')));
};
//# sourceMappingURL=Tr.js.map