"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.flattenTokens = exports.mapToProperty = exports.responsiveStyle = exports.breakpoints = void 0;
const css_1 = require("@vanilla-extract/css");
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_omit_1 = __importDefault(require("lodash.omit"));
const is_1 = require("../utils/is");
const object_1 = require("../utils/object");
const contract_css_1 = require("./tokens/contract.css");
exports.breakpoints = {
    xs: '',
    sm: 'screen and (min-width: 40rem)',
    md: 'screen and (min-width: 48rem)',
    lg: 'screen and (min-width: 64rem)',
    xl: 'screen and (min-width: 80rem)',
    xxl: 'screen and (min-width: 96rem)',
};
const makeMediaQuery = (breakpoint) => (styles) => Object.keys(styles).length === 0
    ? {}
    : {
        [exports.breakpoints[breakpoint]]: styles,
    };
const mediaQuery = {
    sm: makeMediaQuery('sm'),
    md: makeMediaQuery('md'),
    lg: makeMediaQuery('lg'),
    xl: makeMediaQuery('xl'),
    xxl: makeMediaQuery('xxl'),
};
const responsiveStyle = ({ xs, sm, md, lg, xl, xxl, }) => ({
    ...(0, lodash_omit_1.default)(xs, '@media'),
    ...(sm || md || lg || xl || xxl
        ? {
            '@media': {
                ...mediaQuery.sm(sm !== null && sm !== void 0 ? sm : {}),
                ...mediaQuery.md(md !== null && md !== void 0 ? md : {}),
                ...mediaQuery.lg(lg !== null && lg !== void 0 ? lg : {}),
                ...mediaQuery.xl(xl !== null && xl !== void 0 ? xl : {}),
                ...mediaQuery.xxl(xxl !== null && xxl !== void 0 ? xxl : {}),
            },
        }
        : {}),
});
exports.responsiveStyle = responsiveStyle;
const mapToProperty = (property, breakpoint) => (value) => {
    const styleRule = { [property]: value };
    return breakpoint
        ? (0, exports.responsiveStyle)({ [breakpoint]: styleRule })
        : styleRule;
};
exports.mapToProperty = mapToProperty;
const ignoredTokens = ['@hover', '@focus', '@disabled'];
function flattenTokens(tokens) {
    return (0, object_1.flattenObject)(tokens, ignoredTokens);
}
exports.flattenTokens = flattenTokens;
function token(path, fallback) {
    const v = (0, lodash_get_1.default)(contract_css_1.tokens.kda.foundation, path);
    if (!(0, is_1.isNullOrUndefined)(fallback)) {
        return (0, css_1.fallbackVar)(v, fallback);
    }
    return v;
}
exports.token = token;
//# sourceMappingURL=themeUtils.js.map