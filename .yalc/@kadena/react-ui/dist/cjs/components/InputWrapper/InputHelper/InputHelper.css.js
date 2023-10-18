"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helperIconClass = exports.helperClass = exports.helperTextColor = exports.helperIconColor = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const vars_css_1 = require("../../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.helperIconColor = (0, css_1.createVar)(), exports.helperTextColor = (0, css_1.createVar)();
exports.helperClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'center',
        gap: '$1',
        fontSize: '$xs',
        marginY: '$3',
        color: '$foreground',
    }),
    {
        color: (0, css_1.fallbackVar)(exports.helperTextColor, vars_css_1.vars.colors.$primaryContrastInverted),
    },
]);
exports.helperIconClass = (0, css_1.style)({
    color: (0, css_1.fallbackVar)(exports.helperIconColor, vars_css_1.vars.colors.$primaryAccent),
});
//# sourceMappingURL=InputHelper.css.js.map