"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disabledClass = exports.fullWidthClass = exports.containerClass = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const css_1 = require("@vanilla-extract/css");
exports.containerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        backgroundColor: 'layer-2.default',
        color: 'text.base.default',
        paddingInline: 'xxl',
        paddingBlock: 'lg',
        borderRadius: 'sm',
        border: 'hairline',
        position: 'relative',
    }),
    {
        maxWidth: '100%',
        width: 'max-content',
    },
]);
exports.fullWidthClass = (0, css_1.style)({ width: '100%' });
exports.disabledClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        pointerEvents: 'none',
    }),
    {
        opacity: 0.5,
    },
]);
//# sourceMappingURL=Card.css.js.map