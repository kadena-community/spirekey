"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentClass = exports.containerClass = exports.itemClass = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const css_1 = require("@vanilla-extract/css");
exports.itemClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        backgroundColor: 'semantic.info.default',
        color: 'text.semantic.info.default',
        fontWeight: 'bodyFont.medium',
        padding: 'sm',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'base.boldest',
        borderStyle: 'solid',
        borderWidth: 'hairline',
    }),
]);
exports.containerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        backgroundColor: 'semantic.warning.default',
        borderColor: 'base.boldest',
        borderStyle: 'solid',
        borderWidth: 'hairline',
        width: '100%',
    }),
]);
exports.componentClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        backgroundColor: 'semantic.positive.default',
        color: 'text.semantic.positive.default',
        borderColor: 'base.boldest',
        borderStyle: 'solid',
        borderWidth: 'hairline',
    }),
]);
//# sourceMappingURL=stories.css.js.map