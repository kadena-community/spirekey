"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseContainerClass = exports.baseOutlinedClass = exports.statusOutlineColor = exports.statusColor = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const contract_css_1 = require("../../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
exports.statusColor = (0, css_1.createVar)();
exports.statusOutlineColor = (0, css_1.createVar)();
exports.baseOutlinedClass = (0, css_1.style)([
    {
        outline: `2px solid ${(0, css_1.fallbackVar)(exports.statusOutlineColor, contract_css_1.tokens.kda.foundation.color.border.base.default)}`,
    },
]);
exports.baseContainerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        alignItems: 'stretch',
        borderRadius: 'sm',
        display: 'flex',
        color: 'text.base.default',
        overflow: 'hidden',
        lineHeight: 'lg',
        backgroundColor: 'layer-3.default',
        position: 'relative',
    }),
    {
        boxShadow: `0px 1px 0 0 ${contract_css_1.tokens.kda.foundation.color.border.base.default}`,
        outlineOffset: '2px',
        selectors: {
            '&:focus-within': {
                outline: `2px solid ${(0, css_1.fallbackVar)(exports.statusColor, contract_css_1.tokens.kda.foundation.color.border.semantic.info['@focus'])}`,
                outlineOffset: '2px',
            },
        },
    },
]);
//# sourceMappingURL=Form.css.js.map