"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusVariant = void 0;
const atoms_css_1 = require("../../../styles/atoms.css");
const contract_css_1 = require("../../../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
const Form_css_1 = require("../Form.css");
const FormFieldHelper_css_1 = require("./FormFieldHelper/FormFieldHelper.css");
const statusOptions = {
    disabled: 'disabled',
    positive: 'positive',
    warning: 'warning',
    negative: 'negative',
};
exports.statusVariant = (0, css_1.styleVariants)(statusOptions, (status) => {
    var _a, _b, _c, _d;
    if (status === 'disabled') {
        return [(0, atoms_css_1.atoms)({ pointerEvents: 'none' }), { opacity: 0.4 }];
    }
    return {
        vars: {
            [FormFieldHelper_css_1.helperIconColor]: (_a = contract_css_1.tokens.kda.foundation.color.icon.semantic[status]) === null || _a === void 0 ? void 0 : _a.default,
            [Form_css_1.statusColor]: (_b = contract_css_1.tokens.kda.foundation.color.border.semantic[status]) === null || _b === void 0 ? void 0 : _b['@focus'],
            [Form_css_1.statusOutlineColor]: (_c = contract_css_1.tokens.kda.foundation.color.border.semantic[status]) === null || _c === void 0 ? void 0 : _c.subtle,
            [FormFieldHelper_css_1.helperTextColor]: (_d = contract_css_1.tokens.kda.foundation.color.text.semantic[status]) === null || _d === void 0 ? void 0 : _d.default,
        },
    };
});
//# sourceMappingURL=FormFieldWrapper.css.js.map