"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagGroupLabelClass = exports.tagListClass = exports.closeButtonClass = exports.tagClass = exports.tagItemClass = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const contract_css_1 = require("../../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
const css_utils_1 = require("@vanilla-extract/css-utils");
exports.tagItemClass = (0, css_1.style)([
    {
        selectors: {
            '&[aria-disabled="true"]': {
                opacity: 0.4,
                cursor: 'not-allowed',
            },
            '&[data-focus-visible="true"]': {
                outline: `2px auto ${contract_css_1.tokens.kda.foundation.color.accent.brand.primary}`,
                outlineOffset: '2px',
            },
            '&[data-focus-visible="false"]': {
                outline: 'none',
            },
        },
    },
]);
exports.tagClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        backgroundColor: 'layer-2.default',
        color: 'text.base.default',
        borderRadius: 'xs',
        paddingBlock: 'xs',
        paddingInline: 'sm',
        display: 'inline-flex',
        alignItems: 'center',
        border: 'hairline',
    }),
]);
exports.closeButtonClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        border: 'none',
        background: 'none',
        padding: 'xs',
        cursor: 'pointer',
        marginInlineStart: 'xs',
        outline: 'none',
    }),
    {
        marginRight: (0, css_utils_1.calc)(contract_css_1.tokens.kda.foundation.spacing.xs).negate().toString(),
    },
]);
exports.tagListClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'flex',
        gap: 'sm',
        flexWrap: 'wrap',
        flexDirection: 'row',
    }),
]);
exports.tagGroupLabelClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        marginBlockEnd: 'sm',
        display: 'block',
    }),
]);
//# sourceMappingURL=Tag.css.js.map