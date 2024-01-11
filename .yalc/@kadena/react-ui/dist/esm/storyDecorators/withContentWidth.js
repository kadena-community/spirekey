import { atoms } from '../styles/atoms.css';
import classNames from 'classnames';
import React from 'react';
import { minWidth } from './storyDecorators.css';
const WithContentWidth = ({ children }) => {
    return (React.createElement("div", { className: classNames(atoms({ maxWidth: 'content.maxWidth' }), minWidth) }, children));
};
export const withContentWidth = (story) => (React.createElement(WithContentWidth, null, story()));
//# sourceMappingURL=withContentWidth.js.map