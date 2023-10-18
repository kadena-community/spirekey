"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.ContentClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$primarySurfaceInverted',
        borderRadius: '$sm',
        padding: '$2',
        color: '$neutral6',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }),
]);
//# sourceMappingURL=stories.css.js.map