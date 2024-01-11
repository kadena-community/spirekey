"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradientTextClass = void 0;
const atoms_css_1 = require("../../../styles/atoms.css");
const index_1 = require("../../../styles/index");
const css_1 = require("@vanilla-extract/css");
exports.gradientTextClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        fontWeight: 'bodyFont.bold',
    }),
    {
        backgroundColor: 'inherit',
        backgroundImage: `linear-gradient(50deg, ${index_1.tokens.kda.foundation.color.accent.brand.secondary}, ${index_1.tokens.kda.foundation.color.accent.brand.primary} 90%)`,
        backgroundSize: '100%',
        color: 'white',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
]);
//# sourceMappingURL=GradientText.css.js.map