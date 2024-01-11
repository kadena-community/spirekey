"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonClass = void 0;
const atoms_css_1 = require("../../../styles/atoms.css");
const contract_css_1 = require("../../../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
exports.buttonClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 'md',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'base.default',
        color: 'text.base.default',
    }),
    {
        width: '32px',
        height: '32px',
        selectors: {
            [`&:hover`]: {
                backgroundColor: contract_css_1.tokens.kda.foundation.color.background.base['@hover'],
                color: contract_css_1.tokens.kda.foundation.color.background.base.default,
            },
        },
        ':disabled': {
            opacity: 0.7,
            backgroundColor: contract_css_1.tokens.kda.foundation.color.icon.base['@disabled'],
            color: contract_css_1.tokens.kda.foundation.color.text.base['@disabled'],
            cursor: 'not-allowed',
            pointerEvents: 'none',
        },
    },
]);
//# sourceMappingURL=CopyButton.css.js.map