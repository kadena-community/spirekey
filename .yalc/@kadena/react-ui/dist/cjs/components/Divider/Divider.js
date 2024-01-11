"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const react_aria_1 = require("react-aria");
const Divider_css_1 = require("./Divider.css");
const Divider = ({ className, ...props }) => {
    const { separatorProps } = (0, react_aria_1.useSeparator)({
        ...props,
        elementType: 'hr',
        orientation: 'horizontal',
    });
    return react_1.default.createElement("hr", { className: (0, classnames_1.default)(Divider_css_1.dividerClass, className), ...separatorProps });
};
exports.Divider = Divider;
//# sourceMappingURL=Divider.js.map