"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagClass = exports.infoClass = exports.headerClass = void 0;
const atoms_css_1 = require("../../../../styles/atoms.css");
const css_1 = require("@vanilla-extract/css");
exports.headerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'flex',
        alignItems: 'center',
        gap: 'sm',
        marginBlock: 'sm',
    }),
]);
exports.infoClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'flex',
        alignItems: 'center',
        gap: 'xxs',
        fontSize: 'xs',
        marginInlineStart: 'auto',
        color: 'text.base.default',
    }),
]);
exports.tagClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        backgroundColor: 'layer-3.inverse.default',
        color: 'text.base.inverse.default',
        borderRadius: 'sm',
        paddingInline: 'sm',
        fontSize: 'xs',
        fontWeight: 'bodyFont.bold',
        display: 'inline-block',
    }),
    {
        paddingTop: '0.05rem',
        paddingBottom: '0.05rem',
    },
]);
//# sourceMappingURL=FormFieldHeader.css.js.map