import { sprinkles } from '../../styles/sprinkles.css';
import classNames from 'classnames';
import React from 'react';
import { TBody } from './TBody';
import { THead } from './THead';
import { tableClass } from './Table.css';
export const Table = ({ children, striped, wordBreak }) => {
    return (React.createElement("table", { className: classNames(tableClass, { stripedClass: striped }, sprinkles({ wordBreak })) }, React.Children.map(children, (child) => {
        if (!React.isValidElement(child) ||
            (Boolean(child) && child.type !== TBody && child.type !== THead))
            return null;
        return child;
    })));
};
//# sourceMappingURL=Table.js.map