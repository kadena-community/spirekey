"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minWidth = void 0;
const themeUtils_1 = require("../styles/themeUtils");
const contract_css_1 = require("../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
exports.minWidth = (0, css_1.style)((0, themeUtils_1.responsiveStyle)({
    xs: { minWidth: '100%' },
    sm: { minWidth: contract_css_1.tokens.kda.foundation.layout.content.minWidth },
}));
//# sourceMappingURL=storyDecorators.css.js.map