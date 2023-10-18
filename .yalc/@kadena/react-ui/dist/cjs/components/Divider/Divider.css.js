"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dividerClass = void 0;
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.dividerClass = (0, css_1.style)({
    borderColor: `${vars_css_1.vars.colors.$borderDefault}`,
    borderWidth: '1px',
    margin: `${vars_css_1.vars.sizes.$10} 0`,
    borderBottomWidth: '0',
});
//# sourceMappingURL=Divider.css.js.map