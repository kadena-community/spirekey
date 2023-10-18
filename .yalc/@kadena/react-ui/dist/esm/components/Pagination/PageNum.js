import classNames from 'classnames';
import React from 'react';
import { pageNumButtonClass } from './Pagination.css';
export const PageNum = ({ number, current, onClick }) => {
    return (React.createElement("button", { className: classNames(pageNumButtonClass, { current }), onClick: onClick }, number));
};
//# sourceMappingURL=PageNum.js.map