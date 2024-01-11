"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadingTextWidthVariant = exports.inputChildrenClass = exports.leadingTextWrapperClass = exports.leadingTextClass = exports.inputClass = exports.inputContainerClass = exports.disabledClass = void 0;
const atoms_css_1 = require("../../../styles/atoms.css");
const contract_css_1 = require("../../../styles/tokens/contract.css");
const vars_css_1 = require("../../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
const css_utils_1 = require("@vanilla-extract/css-utils");
exports.disabledClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        pointerEvents: 'none',
        backgroundColor: 'layer-3.default',
    }),
]);
exports.inputContainerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        gap: 'xs',
        lineHeight: 'lg',
        paddingInlineStart: 'sm',
        paddingInlineEnd: 'xs',
    }),
]);
exports.inputClass = (0, css_1.style)([
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
        '::placeholder': {
            color: contract_css_1.tokens.kda.foundation.color.text.subtlest.default,
        },
    },
]);
exports.leadingTextClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        overflow: 'hidden',
        display: 'inline-block',
        alignItems: 'center',
        paddingInline: 'sm',
        whiteSpace: 'nowrap',
    }),
    {
        textOverflow: 'ellipsis',
    },
]);
exports.leadingTextWrapperClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        backgroundColor: 'base.default',
        display: 'flex',
        alignItems: 'center',
    }),
]);
exports.inputChildrenClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        padding: 'xxs',
    }),
    {
        marginRight: (0, css_utils_1.calc)(contract_css_1.tokens.kda.foundation.spacing.xs).negate().toString(),
    },
]);
exports.leadingTextWidthVariant = (0, css_1.styleVariants)(vars_css_1.vars.sizes, (size) => {
    return {
        width: size,
    };
});
//# sourceMappingURL=Input.css.js.map