"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockLinkClass = exports.linkContainerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.linkContainerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'inline-flex',
        gap: '$2',
        color: '$primaryContrastInverted',
    }),
    {
        selectors: {
            '&:hover': {
                textDecoration: 'none',
            },
            '&:active': {
                color: vars_css_1.vars.colors.$negativeContrastInverted,
            },
            '&:visited': {
                color: vars_css_1.vars.colors.$tertiaryContrastInverted,
            },
        },
    },
]);
exports.blockLinkClass = (0, css_1.style)({
    display: 'flex',
});
//# sourceMappingURL=Link.css.js.map