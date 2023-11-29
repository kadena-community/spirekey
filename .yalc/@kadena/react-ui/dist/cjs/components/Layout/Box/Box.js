"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const Box = ({ as = 'div', children, className, alignItems, backgroundColor, borderColor, borderRadius, borderStyle, borderWidth, bottom, cursor, display = 'block', flexDirection, flexGrow, flexShrink, flexWrap, height, inset, justifyContent, left, margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, maxHeight, maxWidth, minHeight, minWidth, opacity, overflow, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, paddingX, paddingY, position, right, textAlign, top, width, zIndex, }) => {
    return (0, react_1.createElement)(as, {
        className: (0, classnames_1.default)((0, sprinkles_css_1.sprinkles)({
            alignItems,
            backgroundColor,
            borderColor,
            borderRadius,
            borderStyle,
            borderWidth,
            bottom,
            cursor,
            display,
            flexDirection,
            flexGrow,
            flexShrink,
            flexWrap,
            height,
            inset,
            justifyContent,
            left,
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
            opacity,
            overflow,
            padding,
            paddingBottom,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingX,
            paddingY,
            position,
            right,
            textAlign,
            top,
            width,
            zIndex,
        }), className),
    }, children);
};
exports.Box = Box;
//# sourceMappingURL=Box.js.map