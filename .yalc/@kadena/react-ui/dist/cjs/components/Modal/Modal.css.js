"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.underlayClass = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const css_1 = require("@vanilla-extract/css");
exports.underlayClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        cursor: 'pointer',
        inset: 0,
    }),
    {
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
    },
]);
//# sourceMappingURL=Modal.css.js.map