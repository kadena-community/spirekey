"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const react_1 = require("react");
const Box = ({ as = 'div', display = 'block', margin = undefined, marginX = undefined, marginY = undefined, marginTop = undefined, marginBottom = undefined, marginLeft = undefined, marginRight = undefined, padding = undefined, paddingX = undefined, paddingY = undefined, paddingTop = undefined, paddingBottom = undefined, paddingLeft = undefined, paddingRight = undefined, children, }) => {
    return (0, react_1.createElement)(as, {
        className: (0, sprinkles_css_1.sprinkles)({
            display,
            margin,
            marginX,
            marginY,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            padding,
            paddingX,
            paddingY,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
        }),
        'data-testid': 'kda-box',
    }, children);
};
exports.Box = Box;
//# sourceMappingURL=Box.js.map