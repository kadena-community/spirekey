"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const Stack = ({ className, children, alignItems, as = 'div', direction, gap, justifyContent, height, margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, maxHeight, maxWidth, minHeight, minWidth, overflow, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, paddingX, paddingY, width, wrap, }) => {
    return (0, react_1.createElement)(as, {
        className: (0, classnames_1.default)((0, sprinkles_css_1.sprinkles)({
            alignItems,
            display: 'flex',
            flexDirection: direction,
            flexWrap: wrap,
            gap,
            justifyContent,
            height,
            margin,
            marginBottom,
            marginLeft,
            marginRight,
            marginTop,
            marginX,
            marginY,
            maxHeight,
            maxWidth,
            minHeight,
            minWidth,
            overflow,
            padding,
            paddingBottom,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingX,
            paddingY,
            width,
        }), className),
    }, children);
};
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map