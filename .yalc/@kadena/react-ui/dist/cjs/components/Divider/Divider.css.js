"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dividerClass = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const index_1 = require("../../styles/index");
const css_1 = require("@vanilla-extract/css");
exports.dividerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        width: '100%',
        marginBlock: 'lg',
        border: 'none',
    }),
    {
        backgroundColor: index_1.tokens.kda.foundation.color.border.base.bold,
        height: index_1.tokens.kda.foundation.border.width.hairline,
    },
]);
//# sourceMappingURL=Divider.css.js.map