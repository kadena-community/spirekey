import React, { useRef } from 'react';
import { useTabPanel } from 'react-aria';
import { tabContentClass } from './Tabs.css';
export const TabPanel = ({ state, ...props }) => {
    var _a;
    const ref = useRef(null);
    const { tabPanelProps } = useTabPanel(props, state, ref);
    return (React.createElement("div", { className: tabContentClass, ...tabPanelProps, ref: ref }, (_a = state.selectedItem) === null || _a === void 0 ? void 0 : _a.props.children));
};
//# sourceMappingURL=TabPanel.js.map