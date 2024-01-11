import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { breakpoints } from './themeUtils';
import { primaryFont, vars } from './vars.css';
globalFontFace(primaryFont, {
    fontWeight: 300,
    src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
});
globalFontFace(primaryFont, {
    fontWeight: 400,
    src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
});
globalFontFace(primaryFont, {
    fontWeight: 700,
    src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
});
globalFontFace(primaryFont, {
    fontWeight: 900,
    src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
});
globalStyle('*, *::before, *::after', {
    boxSizing: `border-box`,
});
globalStyle('*', {
    margin: 0,
});
globalStyle('html, body', {
    height: '100%',
    fontFamily: vars.fonts.$main,
});
globalStyle('body', {
    lineHeight: 1.4,
    WebkitFontSmoothing: 'antialiased',
});
globalStyle('img, picture, video, canvas, svg', {
    display: 'block',
    maxWidth: '100%',
});
globalStyle('button, input, select, textarea, label', {
    fontFamily: vars.fonts.$main,
});
globalStyle('p, h1, h2, h3, h4, h5, h6, span', {
    overflowWrap: 'break-word',
    fontFamily: vars.fonts.$main,
});
globalStyle('#root, #__next', {
    isolation: 'isolate',
});
globalStyle(':root', {
    vars: {
        '--spacing-2xs': vars.sizes.$1,
        '--spacing-xs': vars.sizes.$2,
        '--spacing-sm': vars.sizes.$3,
        '--spacing-md': vars.sizes.$4,
        '--spacing-lg': vars.sizes.$6,
        '--spacing-xl': vars.sizes.$7,
        '--spacing-2xl': vars.sizes.$9,
        '--spacing-3xl': vars.sizes.$10,
    },
    '@media': {
        [breakpoints.md]: {
            vars: {
                '--spacing-3xl': vars.sizes.$12,
            },
        },
        [breakpoints.lg]: {
            vars: {
                '--spacing-2xl': vars.sizes.$10,
                '--spacing-3xl': vars.sizes.$15,
            },
        },
        [breakpoints.xl]: {
            vars: {
                '--spacing-xl': vars.sizes.$8,
                '--spacing-2xl': vars.sizes.$13,
                '--spacing-3xl': vars.sizes.$20,
            },
        },
        [breakpoints.xxl]: {
            vars: {
                '--spacing-xl': vars.sizes.$11,
                '--spacing-2xl': vars.sizes.$17,
                '--spacing-3xl': vars.sizes.$25,
            },
        },
    },
});
//# sourceMappingURL=global.css.js.map