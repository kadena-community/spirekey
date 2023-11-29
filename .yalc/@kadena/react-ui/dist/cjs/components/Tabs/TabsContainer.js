"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsContainer = void 0;
const react_1 = __importStar(require("react"));
const Tab_1 = require("./Tab");
const TabContent_1 = require("./TabContent");
const Tabs_css_1 = require("./Tabs.css");
const TabsContainer = ({ children, initialTab = undefined, currentTab = undefined, ...props }) => {
    const [_activeTab, setActiveTab] = (0, react_1.useState)(initialTab);
    const activeTab = currentTab || _activeTab;
    const containerRef = (0, react_1.useRef)(null);
    const selectedUnderlineRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement("section", { ...props },
        react_1.default.createElement("div", { className: Tabs_css_1.tabsContainerWrapper },
            react_1.default.createElement("div", { ref: containerRef, className: Tabs_css_1.tabsContainer },
                react_1.default.Children.map(children, (child) => {
                    if (!react_1.default.isValidElement(child))
                        return null;
                    if (child.type === Tab_1.Tab) {
                        const props = {
                            ...child.props,
                            key: child.props.id,
                            selected: activeTab === child.props.id,
                            handleClick,
                        };
                        return react_1.default.cloneElement(child, props);
                    }
                    return null;
                }),
                react_1.default.createElement("span", { ref: selectedUnderlineRef, className: Tabs_css_1.selectorLine }))),
        react_1.default.Children.map(children, (child) => {
            if (!react_1.default.isValidElement(child))
                return null;
            if (child.type === TabContent_1.TabContent) {
                const props = {
                    selected: activeTab === child.props.id,
                };
                return react_1.default.cloneElement(child, props);
            }
            return null;
        })));
};
exports.TabsContainer = TabsContainer;
//# sourceMappingURL=TabsContainer.js.map