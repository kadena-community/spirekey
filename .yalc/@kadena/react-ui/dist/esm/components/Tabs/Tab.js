import React, { useRef } from 'react';
import { useTab } from 'react-aria';
import { tabItemClass } from './Tabs.css';
export const Tab = ({ item, state }) => {
    const { key, rendered } = item;
    const ref = useRef(null);
    const { tabProps } = useTab({ key }, state, ref);
    return (React.createElement("div", { className: tabItemClass, ...tabProps, ref: ref, role: "tab", "data-selected": state.selectedKey === key }, rendered));
};
//# sourceMappingURL=Tab.js.map