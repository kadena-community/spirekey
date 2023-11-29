"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonClass = void 0;
const colors_1 = require("../../../styles/colors");
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const vars_css_1 = require("../../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.buttonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '$md',
        cursor: 'pointer',
        border: 'none',
        width: '$8',
        height: '$8',
    }),
    {
        selectors: {
            [`${vars_css_1.darkThemeClass} &`]: {
                backgroundColor: `${colors_1.colorPalette.$gray80}`,
                color: `${colors_1.colorPalette.$gray30}`,
            },
            [`${vars_css_1.darkThemeClass} &:hover`]: {
                backgroundColor: `${colors_1.colorPalette.$gray20}`,
                color: `${colors_1.colorPalette.$gray100}`,
            },
            [`&:hover`]: {
                backgroundColor: `${colors_1.colorPalette.$gray80}`,
                color: `${colors_1.colorPalette.$gray20}`,
            },
        },
        ':disabled': {
            opacity: 0.7,
            backgroundColor: colors_1.colorPalette.$gray60,
            color: colors_1.colorPalette.$gray10,
            cursor: 'not-allowed',
            pointerEvents: 'none',
        },
    },
]);
//# sourceMappingURL=CopyButton.css.js.map