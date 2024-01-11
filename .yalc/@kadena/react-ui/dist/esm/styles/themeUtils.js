import { fallbackVar } from '@vanilla-extract/css';
import get from 'lodash.get';
import omit from 'lodash.omit';
import { isNullOrUndefined } from '../utils/is';
import { flattenObject } from '../utils/object';
import { tokens } from './tokens/contract.css';
export const breakpoints = {
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
        [breakpoints[breakpoint]]: styles,
    };
const mediaQuery = {
    sm: makeMediaQuery('sm'),
    md: makeMediaQuery('md'),
    lg: makeMediaQuery('lg'),
    xl: makeMediaQuery('xl'),
    xxl: makeMediaQuery('xxl'),
};
export const responsiveStyle = ({ xs, sm, md, lg, xl, xxl, }) => ({
    ...omit(xs, '@media'),
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
export const mapToProperty = (property, breakpoint) => (value) => {
    const styleRule = { [property]: value };
    return breakpoint
        ? responsiveStyle({ [breakpoint]: styleRule })
        : styleRule;
};
const ignoredTokens = ['@hover', '@focus', '@disabled'];
export function flattenTokens(tokens) {
    return flattenObject(tokens, ignoredTokens);
}
export function token(path, fallback) {
    const v = get(tokens.kda.foundation, path);
    if (!isNullOrUndefined(fallback)) {
        return fallbackVar(v, fallback);
    }
    return v;
}
//# sourceMappingURL=themeUtils.js.map