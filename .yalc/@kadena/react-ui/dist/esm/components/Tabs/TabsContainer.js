'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tab } from './Tab';
import { TabContent } from './TabContent';
import { selectorLine, tabsContainer, tabsContainerWrapper } from './Tabs.css';
export const TabsContainer = ({ children, initialTab = undefined, currentTab = undefined, }) => {
    const [_activeTab, setActiveTab] = useState(initialTab);
    const activeTab = currentTab || _activeTab;
    const containerRef = useRef(null);
    const selectedUnderlineRef = useRef(null);
    useEffect(() => {
        if (!containerRef.current || !selectedUnderlineRef.current)
            return;
        let selected = containerRef.current.querySelector('[data-selected="true"]');
        if (selected === undefined || selected === null) {
            selected = containerRef.current.querySelectorAll('button')[0];
        }
        selectedUnderlineRef.current.style.setProperty('transform', `translateX(${selected.offsetLeft}px)`);
        selectedUnderlineRef.current.style.setProperty('width', `${selected.offsetWidth}px`);
    }, [containerRef, activeTab, selectedUnderlineRef]);
    const handleClick = (tabId) => {
        setActiveTab(tabId);
    };
    return (React.createElement("section", null,
        React.createElement("div", { className: tabsContainerWrapper },
            React.createElement("div", { ref: containerRef, className: tabsContainer },
                React.Children.map(children, (child) => {
                    if (!React.isValidElement(child))
                        return null;
                    if (child.type === Tab) {
                        const props = {
                            ...child.props,
                            key: child.props.id,
                            selected: activeTab === child.props.id,
                            handleClick,
                        };
                        return React.cloneElement(child, props);
                    }
                    return null;
                }),
                React.createElement("span", { ref: selectedUnderlineRef, className: selectorLine }))),
        React.Children.map(children, (child) => {
            if (!React.isValidElement(child))
                return null;
            if (child.type === TabContent) {
                const props = {
                    selected: activeTab === child.props.id,
                };
                return React.cloneElement(child, props);
            }
            return null;
        })));
};
//# sourceMappingURL=TabsContainer.js.map