import { SystemIcon } from '../../Icon';
import React, { useState } from 'react';
import { buttonClass } from './CopyButton.css';
const COPY_DURATION_TIME = 1000;
export const CopyButton = ({ value, ...restProps }) => {
    const [click, setClick] = useState(false);
    const handleClick = async () => {
        await navigator.clipboard.writeText(value);
        setClick(true);
        setTimeout(() => {
            setClick(false);
        }, COPY_DURATION_TIME);
    };
    const CheckIcon = SystemIcon.Check;
    const ContentCopyIcon = SystemIcon.ContentCopy;
    return (React.createElement("button", { ...restProps, "aria-label": 'ContentCopy', onClick: handleClick, className: buttonClass }, click ? React.createElement(CheckIcon, { size: "sm" }) : React.createElement(ContentCopyIcon, { size: "sm" })));
};
//# sourceMappingURL=CopyButton.js.map