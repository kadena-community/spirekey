"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorVariants = exports.transformVariants = exports.fontVariants = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
exports.fontVariants = {
    main: [(0, atoms_css_1.atoms)({ fontFamily: 'primaryFont' })],
    mono: [(0, atoms_css_1.atoms)({ fontFamily: 'codeFont' })],
};
exports.transformVariants = {
    uppercase: [(0, atoms_css_1.atoms)({ textTransform: 'uppercase' })],
    lowercase: [(0, atoms_css_1.atoms)({ textTransform: 'lowercase' })],
    capitalize: [(0, atoms_css_1.atoms)({ textTransform: 'capitalize' })],
    none: [(0, atoms_css_1.atoms)({ textTransform: 'none' })],
};
exports.colorVariants = {
    default: [(0, atoms_css_1.atoms)({ color: 'text.subtlest.default' })],
    emphasize: [(0, atoms_css_1.atoms)({ color: 'text.base.default' })],
};
//# sourceMappingURL=typography.css.js.map