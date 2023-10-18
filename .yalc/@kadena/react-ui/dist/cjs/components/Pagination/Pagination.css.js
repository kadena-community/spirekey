"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNumButtonClass = exports.pageNavLabelClass = exports.pageNavButtonClass = exports.listClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.listClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'center',
        gap: '$2',
        padding: 0,
    }),
    { listStyleType: 'none' },
]);
exports.pageNavButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        gap: '$3',
        alignItems: 'center',
        paddingX: '$3',
        paddingY: '$2',
        color: '$primaryContrastInverted',
        border: 'none',
        background: 'none',
        fontWeight: '$semiBold',
    }),
    {
        ':disabled': {
            pointerEvents: 'none',
            color: vars_css_1.vars.colors.$disabledContrast,
        },
    },
]);
exports.pageNavLabelClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: { xs: 'none', sm: 'block' },
    }),
]);
exports.pageNumButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: '$primaryContrastInverted',
        width: '$8',
        paddingY: '$2',
        border: 'none',
        background: 'none',
        fontWeight: '$semiBold',
    }),
    {
        selectors: {
            '&.current': {
                borderRadius: vars_css_1.vars.radii.$sm,
                outline: `2px auto ${vars_css_1.vars.colors.$primaryAccent}`,
            },
        },
    },
]);
//# sourceMappingURL=Pagination.css.js.map