"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptionClass = exports.containerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'grid',
        gap: '$md',
        alignItems: 'center',
        color: '$neutral6',
    }),
    {
        gridRowGap: vars_css_1.vars.sizes.$xs,
        gridTemplateColumns: 'auto 1fr',
    },
]);
exports.descriptionClass = (0, css_1.style)({
    gridColumnStart: 2,
});
//# sourceMappingURL=ContentHeader.css.js.map