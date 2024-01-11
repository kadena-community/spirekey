"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = exports.TabItem = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const react_aria_1 = require("react-aria");
const react_stately_1 = require("react-stately");
Object.defineProperty(exports, "TabItem", { enumerable: true, get: function () { return react_stately_1.Item; } });
const Tab_1 = require("./Tab");
const TabPanel_1 = require("./TabPanel");
const Tabs_css_1 = require("./Tabs.css");
const Tabs = ({ className, ...props }) => {
    var _a, _b;
    const state = (0, react_stately_1.useTabListState)(props);
    const containerRef = (0, react_1.useRef)(null);
    const { focusProps, isFocusVisible } = (0, react_aria_1.useFocusRing)({
        within: true,
    });
    const { tabListProps } = (0, react_aria_1.useTabList)({ ...props, orientation: 'horizontal' }, state, containerRef);
    const selectedUnderlineRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(Tabs_css_1.tabsContainerClass, className) },
        react_1.default.createElement("div", { className: Tabs_css_1.tabListWrapperClass },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(Tabs_css_1.tabListClass, { focusVisible: isFocusVisible }), ...(0, react_aria_1.mergeProps)(tabListProps, focusProps), ref: containerRef },
                [...state.collection].map((item) => (react_1.default.createElement(Tab_1.Tab, { key: item.key, item: item, state: state }))),
                react_1.default.createElement("span", { ref: selectedUnderlineRef, className: Tabs_css_1.selectorLine }))),
        react_1.default.createElement(TabPanel_1.TabPanel, { key: (_b = state.selectedItem) === null || _b === void 0 ? void 0 : _b.key, state: state })));
};
exports.Tabs = Tabs;
//# sourceMappingURL=Tabs.js.map