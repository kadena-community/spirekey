"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemSizeClass = exports.itemClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.itemClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        borderRadius: '$sm',
        backgroundColor: '$primarySurface',
        color: '$neutral6',
        size: '$32',
    }),
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
]);
exports.itemSizeClass = (0, css_1.styleVariants)(vars_css_1.vars.sizes, (size) => {
    return [
        {
            width: size,
            height: size,
        },
    ];
});
//# sourceMappingURL=stories.css.js.map