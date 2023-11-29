"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontBaseBold = exports.fontBaseRegular = exports.fontSmallestBold = exports.fontSmallestRegular = exports.fontSmallBold = exports.fontSmallRegular = exports.fontH6Bold = exports.fontH6Regular = exports.fontH5Bold = exports.fontH5Regular = exports.fontH4Bold = exports.fontH4Regular = exports.fontH3Bold = exports.fontH3Regular = exports.fontH2Bold = exports.fontH2Regular = exports.fontH1Bold = exports.fontH1Regular = void 0;
const css_1 = require("@vanilla-extract/css");
const contract_css_1 = require("./contract.css");
exports.fontH1Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n10,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n14,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1024px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n12,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n17,
        },
        '(width >= 1280px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n15,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n20,
        },
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n18,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n25,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n20,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n30,
        },
    },
});
exports.fontH1Bold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n10,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n14,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1024px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n12,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n17,
        },
        '(width >= 1280px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n15,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n20,
        },
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n18,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n25,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n20,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n30,
        },
    },
});
exports.fontH2Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n9,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n11,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n16,
        },
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n13,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n19,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n15,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n20,
        },
    },
});
exports.fontH2Bold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n9,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n11,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n16,
        },
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n13,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n19,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n15,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n20,
        },
    },
});
exports.fontH3Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n7,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n11,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n9,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
        },
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n10,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n15,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n11,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n17,
        },
    },
});
exports.fontH3Bold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n7,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n11,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n9,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
        },
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n10,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n15,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n11,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n17,
        },
    },
});
exports.fontH4Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n6,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n7,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n11,
        },
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n8,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n12,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n9,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
        },
    },
});
exports.fontH4Bold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n6,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n7,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n11,
        },
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n8,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n12,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n9,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
        },
    },
});
exports.fontH5Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n5,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n8,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n6,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n6,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
        },
    },
});
exports.fontH5Bold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n5,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n8,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n6,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n6,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
        },
    },
});
exports.fontH6Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n5,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n7,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n5,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n7,
        },
    },
});
exports.fontH6Bold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1536px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n5,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n7,
        },
        '(width >= 1980px)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n5,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n7,
        },
    },
});
exports.fontSmallRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: '14',
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.fontSmallBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: '14',
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.fontSmallestRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n3,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.fontSmallestBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n3,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.fontBaseRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.light,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.fontBaseBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
//# sourceMappingURL=styles.css.js.map