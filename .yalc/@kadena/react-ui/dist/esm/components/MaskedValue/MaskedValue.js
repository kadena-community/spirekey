'use client';
import { SystemIcon } from '../Icon';
import React, { useState } from 'react';
import { iconContainer, titleContainer, valueContainer, valueIconContainer, } from './MaskedValue.css';
export const MaskedValue = ({ title, value, defaultVisibility = false, startUnmaskedValues = 6, endUnmaskedValues = 4, }) => {
    const [visible, setVisible] = useState(defaultVisibility);
    const toggleVisibility = () => {
        setVisible(!visible);
    };
    let maskedValue = value;
    if (startUnmaskedValues + endUnmaskedValues <= value.length - 1) {
        maskedValue = `${value.slice(0, startUnmaskedValues)}****${value.slice(-endUnmaskedValues)}`;
    }
    return (React.createElement("div", { "data-testid": "kda-masked-value" },
        React.createElement("div", { className: titleContainer }, title),
        React.createElement("div", { className: valueIconContainer },
            React.createElement("div", { className: valueContainer }, visible ? value : maskedValue),
            visible ? (React.createElement(SystemIcon.EyeOffOutline, { className: iconContainer, onClick: toggleVisibility })) : (React.createElement(SystemIcon.EyeOutline, { className: iconContainer, onClick: toggleVisibility })))));
};
//# sourceMappingURL=MaskedValue.js.map