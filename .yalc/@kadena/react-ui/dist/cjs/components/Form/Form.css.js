"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseContainerClass = exports.baseOutlinedClass = exports.statusOutlineColor = exports.statusColor = void 0;
const colors_1 = require("../../styles/colors");
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.statusColor = (0, css_1.createVar)();
exports.statusOutlineColor = (0, css_1.createVar)();
exports.baseOutlinedClass = (0, css_1.style)([
    {
        outline: `2px solid ${(0, css_1.fallbackVar)(exports.statusOutlineColor, vars_css_1.vars.colors.$gray30)}`,
        selectors: {
            [`${vars_css_1.darkThemeClass} &`]: {
                outline: `2px solid ${(0, css_1.fallbackVar)(exports.statusOutlineColor, vars_css_1.vars.colors.$gray60)}`,
            },
        },
    },
]);
exports.baseContainerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'stretch',
        borderRadius: '$sm',
        display: 'flex',
        color: '$foreground',
        overflow: 'hidden',
        lineHeight: '$lg',
        bg: {
            lightMode: '$white',
            darkMode: '$gray100',
        },
    }),
    {
        position: 'relative',
        boxShadow: `0px 1px 0 0 ${colors_1.colorPalette.$gray30}`,
        outlineOffset: '2px',
        selectors: {
            [`${vars_css_1.darkThemeClass} &`]: {
                boxShadow: `0px 1px 0 0 ${colors_1.colorPalette.$gray60}`,
            },
            '&:focus-within': {
                outline: `2px solid ${(0, css_1.fallbackVar)(exports.statusColor, vars_css_1.vars.colors.$blue60)}`,
                outlineOffset: '2px',
            },
        },
    },
]);
//# sourceMappingURL=Form.css.js.map