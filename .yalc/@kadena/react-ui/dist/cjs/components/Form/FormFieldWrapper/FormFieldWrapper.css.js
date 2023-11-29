"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusVariant = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const vars_css_1 = require("../../../styles/vars.css");
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
    if (status === 'disabled') {
        return [(0, sprinkles_css_1.sprinkles)({ pointerEvents: 'none' }), { opacity: 0.4 }];
    }
    return {
        vars: {
            [FormFieldHelper_css_1.helperIconColor]: vars_css_1.vars.colors[`$${status}Accent`],
            [Form_css_1.statusColor]: vars_css_1.vars.colors[`$${status}Accent`],
            [Form_css_1.statusOutlineColor]: vars_css_1.vars.colors[`$${status}Surface`],
            [FormFieldHelper_css_1.helperTextColor]: vars_css_1.vars.colors[`$${status}ContrastInverted`],
        },
    };
});
//# sourceMappingURL=FormFieldWrapper.css.js.map