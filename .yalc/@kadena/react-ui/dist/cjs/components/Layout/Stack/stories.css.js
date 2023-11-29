"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemSizeClass = void 0;
const vars_css_1 = require("../../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.itemSizeClass = (0, css_1.styleVariants)(vars_css_1.vars.sizes, (size) => {
    return [
        {
            width: size,
            height: size,
        },
    ];
});
//# sourceMappingURL=stories.css.js.map