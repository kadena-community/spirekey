"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dividerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.dividerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$borderDefault',
        width: '100%',
        marginY: '$10',
        border: 'none',
    }),
    {
        height: vars_css_1.vars.borderWidths.$sm,
    },
]);
//# sourceMappingURL=Divider.css.js.map