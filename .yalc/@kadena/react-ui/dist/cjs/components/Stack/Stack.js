"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const react_1 = require("react");
const Stack = ({ as = 'div', margin = undefined, marginX = undefined, marginY = undefined, marginTop = undefined, marginBottom = undefined, marginLeft = undefined, marginRight = undefined, gap = undefined, justifyContent = undefined, alignItems = undefined, wrap = undefined, direction = undefined, width = undefined, padding = undefined, paddingX = undefined, paddingY = undefined, paddingTop = undefined, paddingBottom = undefined, paddingLeft = undefined, paddingRight = undefined, children, }) => {
    return (0, react_1.createElement)(as, {
        className: (0, sprinkles_css_1.sprinkles)({
            display: 'flex',
            margin,
            marginX,
            marginY,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            gap,
            justifyContent,
            alignItems,
            flexWrap: wrap,
            flexDirection: direction,
            padding,
            paddingX,
            paddingY,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            width,
        }),
        'data-testid': 'kda-stack',
    }, children);
};
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map