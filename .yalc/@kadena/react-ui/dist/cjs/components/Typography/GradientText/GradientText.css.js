"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradientTextClass = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.gradientTextClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        fontWeight: '$bold',
    }),
    {
        backgroundColor: 'inherit',
        backgroundImage: 'linear-gradient(50deg, #ff00e9, #00c0ff 90%)',
        backgroundSize: '100%',
        color: 'white',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
]);
//# sourceMappingURL=GradientText.css.js.map