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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabPanel = void 0;
const react_1 = __importStar(require("react"));
const react_aria_1 = require("react-aria");
const Tabs_css_1 = require("./Tabs.css");
const TabPanel = ({ state, ...props }) => {
    var _a;
    const ref = (0, react_1.useRef)(null);
    const { tabPanelProps } = (0, react_aria_1.useTabPanel)(props, state, ref);
    return (react_1.default.createElement("div", { className: Tabs_css_1.tabContentClass, ...tabPanelProps, ref: ref }, (_a = state.selectedItem) === null || _a === void 0 ? void 0 : _a.props.children));
};
exports.TabPanel = TabPanel;
//# sourceMappingURL=TabPanel.js.map