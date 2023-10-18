"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelClass = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.labelClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        fontSize: '$sm',
        color: '$foreground',
        fontWeight: '$bold',
        textTransform: 'capitalize',
    }),
]);
//# sourceMappingURL=Label.css.js.map