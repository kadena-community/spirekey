"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const atoms_css_1 = require("../../../styles/atoms.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const Box = ({ as = 'div', alignItems, backgroundColor, borderColor, borderRadius, borderStyle, borderWidth, bottom, children, className, cursor, display = 'block', flex, flexDirection, flexGrow, flexShrink, flexWrap, gap, height, inset, justifyContent, left, margin, marginBlock, marginBlockEnd, marginBlockStart, marginInline, marginInlineEnd, marginInlineStart, maxWidth, minWidth, opacity, overflow, padding, paddingBlock, paddingBlockEnd, paddingBlockStart, paddingInline, paddingInlineEnd, paddingInlineStart, position, right, textAlign, top, width, zIndex, ...props }) => {
    return (0, react_1.createElement)(as, {
        className: (0, classnames_1.default)((0, atoms_css_1.atoms)({
            alignItems,
            backgroundColor,
            borderColor,
            borderRadius,
            borderStyle,
            borderWidth,
            bottom,
            cursor,
            display,
            flex,
            flexDirection,
            flexGrow,
            flexShrink,
            flexWrap,
            gap,
            height,
            inset,
            justifyContent,
            left,
            margin,
            marginBlock,
            marginBlockEnd,
            marginBlockStart,
            marginInline,
            marginInlineEnd,
            marginInlineStart,
            maxWidth,
            minWidth,
            opacity,
            overflow,
            padding,
            paddingBlock,
            paddingBlockEnd,
            paddingBlockStart,
            paddingInline,
            paddingInlineEnd,
            paddingInlineStart,
            position,
            right,
            textAlign,
            top,
            width,
            zIndex,
        }), className),
        ...props,
    }, children);
};
exports.Box = Box;
//# sourceMappingURL=Box.js.map