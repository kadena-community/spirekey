"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("@vanilla-extract/css");
const themeUtils_1 = require("./themeUtils");
const vars_css_1 = require("./vars.css");
(0, css_1.globalFontFace)(vars_css_1.primaryFont, {
    fontWeight: 300,
    src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
});
(0, css_1.globalFontFace)(vars_css_1.primaryFont, {
    fontWeight: 400,
    src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
});
(0, css_1.globalFontFace)(vars_css_1.primaryFont, {
    fontWeight: 700,
    src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
});
(0, css_1.globalFontFace)(vars_css_1.primaryFont, {
    fontWeight: 900,
    src: "url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2')",
});
(0, css_1.globalStyle)('*, *::before, *::after', {
    boxSizing: `border-box`,
});
(0, css_1.globalStyle)('*', {
    margin: 0,
});
(0, css_1.globalStyle)('html, body', {
    height: '100%',
    fontFamily: vars_css_1.vars.fonts.$main,
});
(0, css_1.globalStyle)('body', {
    lineHeight: 1.4,
    WebkitFontSmoothing: 'antialiased',
});
(0, css_1.globalStyle)('img, picture, video, canvas, svg', {
    display: 'block',
    maxWidth: '100%',
});
(0, css_1.globalStyle)('button, input, select, textarea, label', {
    fontFamily: vars_css_1.vars.fonts.$main,
});
(0, css_1.globalStyle)('p, h1, h2, h3, h4, h5, h6, span', {
    overflowWrap: 'break-word',
    fontFamily: vars_css_1.vars.fonts.$main,
});
(0, css_1.globalStyle)('#root, #__next', {
    isolation: 'isolate',
});
(0, css_1.globalStyle)(':root', {
    vars: {
        '--spacing-2xs': vars_css_1.vars.sizes.$1,
        '--spacing-xs': vars_css_1.vars.sizes.$2,
        '--spacing-sm': vars_css_1.vars.sizes.$3,
        '--spacing-md': vars_css_1.vars.sizes.$4,
        '--spacing-lg': vars_css_1.vars.sizes.$6,
        '--spacing-xl': vars_css_1.vars.sizes.$7,
        '--spacing-2xl': vars_css_1.vars.sizes.$9,
        '--spacing-3xl': vars_css_1.vars.sizes.$10,
    },
    '@media': {
        [themeUtils_1.breakpoints.md]: {
            vars: {
                '--spacing-3xl': vars_css_1.vars.sizes.$12,
            },
        },
        [themeUtils_1.breakpoints.lg]: {
            vars: {
                '--spacing-2xl': vars_css_1.vars.sizes.$10,
                '--spacing-3xl': vars_css_1.vars.sizes.$15,
            },
        },
        [themeUtils_1.breakpoints.xl]: {
            vars: {
                '--spacing-xl': vars_css_1.vars.sizes.$8,
                '--spacing-2xl': vars_css_1.vars.sizes.$13,
                '--spacing-3xl': vars_css_1.vars.sizes.$20,
            },
        },
        [themeUtils_1.breakpoints.xxl]: {
            vars: {
                '--spacing-xl': vars_css_1.vars.sizes.$11,
                '--spacing-2xl': vars_css_1.vars.sizes.$17,
                '--spacing-3xl': vars_css_1.vars.sizes.$25,
            },
        },
    },
});
//# sourceMappingURL=global.css.js.map