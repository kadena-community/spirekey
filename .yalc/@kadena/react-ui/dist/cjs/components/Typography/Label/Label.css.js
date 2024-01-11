"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelClass = void 0;
const atoms_css_1 = require("../../../styles/atoms.css");
const css_1 = require("@vanilla-extract/css");
exports.labelClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        fontSize: 'sm',
        color: 'text.base.default',
        fontWeight: 'bodyFont.bold',
    }),
]);
//# sourceMappingURL=Label.css.js.map