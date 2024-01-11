"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonContainerClass = exports.textAreaClass = exports.textAreaContainerClass = exports.disabledClass = void 0;
const atoms_css_1 = require("../../../styles/atoms.css");
const contract_css_1 = require("../../../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
exports.disabledClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        pointerEvents: 'none',
        backgroundColor: 'layer-3.default',
    }),
]);
exports.textAreaContainerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        position: 'relative',
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        gap: 'xs',
        lineHeight: 'lg',
        paddingInlineStart: 'sm',
        paddingInlineEnd: 'xs',
    }),
]);
exports.textAreaClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        alignItems: 'center',
        background: 'none',
        border: 'none',
        color: 'text.base.default',
        outline: 'none',
        flexGrow: 1,
        paddingBlock: 'sm',
        fontSize: 'base',
    }),
    {
        minHeight: contract_css_1.tokens.kda.foundation.size.n20,
        resize: 'none',
        '::placeholder': {
            color: contract_css_1.tokens.kda.foundation.color.text.subtlest.default,
        },
    },
]);
exports.buttonContainerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        position: 'relative',
    }),
    {
        top: '4px',
    },
]);
//# sourceMappingURL=Textarea.css.js.map