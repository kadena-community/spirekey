"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helperIconClass = exports.helperClass = exports.helperTextColor = exports.helperIconColor = void 0;
const atoms_css_1 = require("../../../../styles/atoms.css");
const contract_css_1 = require("../../../../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
exports.helperIconColor = (0, css_1.createVar)(), exports.helperTextColor = (0, css_1.createVar)();
exports.helperClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'flex',
        alignItems: 'center',
        gap: 'xxs',
        fontSize: 'xs',
        marginBlock: 'sm',
    }),
    {
        color: (0, css_1.fallbackVar)(exports.helperTextColor, contract_css_1.tokens.kda.foundation.color.text.semantic.info.default),
    },
]);
exports.helperIconClass = (0, css_1.style)({
    color: (0, css_1.fallbackVar)(exports.helperIconColor, contract_css_1.tokens.kda.foundation.color.icon.semantic.info.default),
});
//# sourceMappingURL=FormFieldHelper.css.js.map