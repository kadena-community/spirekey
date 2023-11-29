"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentClass = exports.containerClass = exports.itemClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.itemClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$primaryContrast',
        color: '$primarySurface',
        padding: '$6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
]);
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: 'transparent',
        borderColor: '$primaryAccent',
        borderStyle: 'solid',
        borderWidth: '$sm',
        width: '100%',
    }),
]);
exports.componentClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$primarySurface',
        color: '$primaryContrast',
    }),
]);
//# sourceMappingURL=stories.css.js.map