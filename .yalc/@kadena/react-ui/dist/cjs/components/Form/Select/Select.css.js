"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chevronIconClass = exports.selectClass = exports.iconClass = exports.containerClassDisabled = exports.containerClass = void 0;
const atoms_css_1 = require("../../../styles/atoms.css");
const index_1 = require("../../../styles/index");
const css_1 = require("@vanilla-extract/css");
const Form_css_1 = require("../Form.css");
exports.containerClass = (0, css_1.style)([
    Form_css_1.baseContainerClass,
    (0, atoms_css_1.atoms)({
        backgroundColor: 'layer-3.default',
        gap: 'sm',
        paddingInline: 'md',
    }),
]);
exports.containerClassDisabled = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        pointerEvents: 'none',
        color: 'text.base.inverse.default',
        backgroundColor: 'layer-3.inverse.default',
    }),
]);
exports.iconClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        alignItems: 'center',
        display: 'flex',
    }),
]);
exports.selectClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        background: 'none',
        border: 'none',
        color: 'text.base.default',
        flexGrow: 1,
        outline: 'none',
        paddingInlineEnd: 'lg',
        paddingBlock: 'sm',
        fontSize: 'base',
    }),
    {
        backgroundColor: 'inherit',
        color: 'inherit',
        appearance: 'none',
    },
]);
exports.chevronIconClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'inline-flex',
        alignItems: 'center',
        marginInlineEnd: 'sm',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        color: 'icon.base.default',
    }),
    {
        pointerEvents: 'none',
        zIndex: 10,
        selectors: {
            '&:active': {
                color: index_1.tokens.kda.foundation.color.icon.base.default,
            },
        },
    },
]);
//# sourceMappingURL=Select.css.js.map