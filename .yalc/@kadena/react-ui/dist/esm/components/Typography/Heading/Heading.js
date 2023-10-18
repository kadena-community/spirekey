import React from 'react';
import { heading } from './Heading.css';
export const Heading = ({ as = 'h1', variant = as, font = 'main', bold = true, color = 'emphasize', transform = 'none', children, }) => {
    const classList = heading({
        variant,
        font,
        bold,
        color,
        transform,
    });
    switch (as) {
        case 'h2':
            return React.createElement("h2", { className: classList }, children);
        case 'h3':
            return React.createElement("h3", { className: classList }, children);
        case 'h4':
            return React.createElement("h4", { className: classList }, children);
        case 'h5':
            return React.createElement("h5", { className: classList }, children);
        case 'h6':
            return React.createElement("h6", { className: classList }, children);
        case 'h1':
        default:
            return React.createElement("h1", { className: classList }, children);
    }
};
//# sourceMappingURL=Heading.js.map