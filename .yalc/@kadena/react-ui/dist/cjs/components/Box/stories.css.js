"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentClass = exports.containerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        borderRadius: '$sm',
        width: 'min-content',
    }),
    {
        border: `1px solid ${vars_css_1.vars.colors.$primaryHighContrast}`,
    },
]);
exports.contentClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$primarySurface',
        borderRadius: '$sm',
        padding: '$2',
        color: '$neutral3',
        display: 'flex',
        size: '$16',
        alignItems: 'center',
        justifyContent: 'center',
    }),
]);
//# sourceMappingURL=stories.css.js.map