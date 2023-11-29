"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeButtonClass = exports.tagLabelClass = exports.tagClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.tagClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$layoutSurfaceCard',
        color: '$neutral6',
        borderRadius: '$xs',
        padding: '$1',
        display: 'inline-flex',
        alignItems: 'center',
    }),
    {
        border: `1px solid ${vars_css_1.vars.colors.$borderSubtle}`,
    },
]);
exports.tagLabelClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        paddingX: '$2',
    }),
]);
exports.closeButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        border: 'none',
        background: 'none',
        padding: '$1',
        cursor: 'pointer',
    }),
]);
//# sourceMappingURL=Tag.css.js.map