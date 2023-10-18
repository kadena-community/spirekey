"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToProperty = exports.responsiveStyle = exports.breakpoints = void 0;
const lodash_omit_1 = __importDefault(require("lodash.omit"));
exports.breakpoints = {
    xs: '',
    sm: `screen and (min-width: ${640 / 16}rem)`,
    md: `screen and (min-width: ${768 / 16}rem)`,
    lg: `screen and (min-width: ${1024 / 16}rem)`,
    xl: `screen and (min-width: ${1280 / 16}rem)`,
    xxl: `screen and (min-width: ${1536 / 16}rem)`,
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
//# sourceMappingURL=themeUtils.js.map