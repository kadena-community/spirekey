"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridItem = exports.gridContainer = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.gridContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'grid',
        gap: '$xl',
    }),
    {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
]);
exports.gridItem = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '$xs',
        padding: '$sm',
    }),
]);
//# sourceMappingURL=stories.css.js.map