import cn from 'classnames';
import React, { useEffect, useRef } from 'react';
import { mergeProps, useFocusRing, useTabList } from 'react-aria';
import { Item as TabItem, useTabListState } from 'react-stately';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { selectorLine, tabListClass, tabListWrapperClass, tabsContainerClass, } from './Tabs.css';
export { TabItem };
export const Tabs = ({ className, ...props }) => {
    var _a, _b;
    const state = useTabListState(props);
    const containerRef = useRef(null);
    const { focusProps, isFocusVisible } = useFocusRing({
        within: true,
    });
    const { tabListProps } = useTabList({ ...props, orientation: 'horizontal' }, state, containerRef);
    const selectedUnderlineRef = useRef(null);
    useEffect(() => {
        if (!containerRef.current || !selectedUnderlineRef.current) {
            return;
        }
        let selected = containerRef.current.querySelector('[data-selected="true"]');
        if (selected === undefined || selected === null) {
            selected = containerRef.current.querySelectorAll('div[role="tab"]')[0];
        }
        selectedUnderlineRef.current.style.setProperty('transform', `translateX(${selected.offsetLeft}px)`);
        selectedUnderlineRef.current.style.setProperty('width', `${selected.offsetWidth}px`);
    }, [containerRef, (_a = state.selectedItem) === null || _a === void 0 ? void 0 : _a.key, selectedUnderlineRef]);
    return (React.createElement("div", { className: cn(tabsContainerClass, className) },
        React.createElement("div", { className: tabListWrapperClass },
            React.createElement("div", { className: cn(tabListClass, { focusVisible: isFocusVisible }), ...mergeProps(tabListProps, focusProps), ref: containerRef },
                [...state.collection].map((item) => (React.createElement(Tab, { key: item.key, item: item, state: state }))),
                React.createElement("span", { ref: selectedUnderlineRef, className: selectorLine }))),
        React.createElement(TabPanel, { key: (_b = state.selectedItem) === null || _b === void 0 ? void 0 : _b.key, state: state })));
};
//# sourceMappingURL=Tabs.js.map