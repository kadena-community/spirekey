import { sprinkles } from '../../styles/sprinkles.css';
import classNames from 'classnames';
import React from 'react';
import { thClass } from './Table.css';
export const Th = ({ children, width, minWidth, maxWidth }) => {
    return (React.createElement("th", { className: classNames(thClass, sprinkles({ width, minWidth, maxWidth })) }, children));
};
//# sourceMappingURL=Th.js.map