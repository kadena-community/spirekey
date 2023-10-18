import classNames from 'classnames';
import React from 'react';
import { selectedClass, tabClass } from './Tabs.css';
export const Tab = ({ children, selected = false, handleClick, id, }) => {
    if (handleClick === undefined || id === undefined)
        return null;
    return (React.createElement("button", { className: classNames(tabClass, { [selectedClass]: selected }), "data-selected": selected, "data-tab": id, onClick: () => handleClick(id) }, children));
};
//# sourceMappingURL=Tab.js.map