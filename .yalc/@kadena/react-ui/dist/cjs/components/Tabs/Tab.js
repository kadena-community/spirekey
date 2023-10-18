"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Tabs_css_1 = require("./Tabs.css");
const Tab = ({ children, selected = false, handleClick, id, }) => {
    if (handleClick === undefined || id === undefined)
        return null;
    return (react_1.default.createElement("button", { className: (0, classnames_1.default)(Tabs_css_1.tabClass, { [Tabs_css_1.selectedClass]: selected }), "data-selected": selected, "data-tab": id, onClick: () => handleClick(id) }, children));
};
exports.Tab = Tab;
//# sourceMappingURL=Tab.js.map