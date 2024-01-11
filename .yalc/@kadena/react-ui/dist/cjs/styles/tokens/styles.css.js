"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyBaseBold = exports.bodyBaseRegular = exports.bodySmallestBold = exports.bodySmallestRegular = exports.bodySmallBold = exports.bodySmallRegular = exports.fontH6Bold = exports.fontH6Regular = exports.fontH5Bold = exports.fontH5Regular = exports.fontH4Bold = exports.fontH4Regular = exports.fontH3Bold = exports.fontH3Regular = exports.fontH2Bold = exports.fontH2Regular = exports.fontH1Bold = exports.fontH1Regular = exports.codeBaseBold = exports.codeBaseRegular = exports.codeSmallestBold = exports.codeSmallestRegular = exports.codeSmallBold = exports.codeSmallRegular = void 0;
const css_1 = require("@vanilla-extract/css");
const contract_css_1 = require("./contract.css");
exports.codeSmallRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.codeFont,
    fontSize: '14px',
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.monoFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.codeSmallBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.codeFont,
    fontSize: '14px',
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.monoFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.codeSmallestRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.codeFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n3,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.monoFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.codeSmallestBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.codeFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n3,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.monoFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.codeBaseRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.codeFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.monoFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.codeBaseBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.codeFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.monoFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.fontH1Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n10,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n14,
    letterSpacing: '0.125rem',
    '@media': {
        '(width >= 48rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n12,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n17,
        },
        '(width >= 64rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n15,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n20,
        },
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n18,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n25,
        },
        '(width >= 96rem)': {
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
    letterSpacing: '0.125rem',
    '@media': {
        '(width >= 48rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n12,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n17,
        },
        '(width >= 64rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n15,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n20,
        },
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n18,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n25,
        },
        '(width >= 96rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n20,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n30,
        },
    },
});
exports.fontH2Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n9,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
    letterSpacing: '0.125rem',
    '@media': {
        '(width >= 64rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n11,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n16,
        },
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n13,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n19,
        },
        '(width >= 96rem)': {
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
    letterSpacing: '0.125rem',
    '@media': {
        '(width >= 64rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n11,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n16,
        },
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n13,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n19,
        },
        '(width >= 96rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n15,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n20,
        },
    },
});
exports.fontH3Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n7,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n11,
    letterSpacing: '0.125rem',
    '@media': {
        '(width >= 64rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n9,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
        },
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n10,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n15,
        },
        '(width >= 96rem)': {
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
    letterSpacing: '0.125rem',
    '@media': {
        '(width >= 64rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n9,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
        },
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n10,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n15,
        },
        '(width >= 96rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n11,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n17,
        },
    },
});
exports.fontH4Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n6,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
    '@media': {
        '(width >= 64rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n7,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n11,
        },
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n8,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n12,
        },
        '(width >= 96rem)': {
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
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
    '@media': {
        '(width >= 64rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n7,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n11,
        },
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n8,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n12,
        },
        '(width >= 96rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n9,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n13,
        },
    },
});
exports.fontH5Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n5,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n8,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
    '@media': {
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n6,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
        },
        '(width >= 96rem)': {
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
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
    '@media': {
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n6,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
        },
        '(width >= 96rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n6,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n9,
        },
    },
});
exports.fontH6Regular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.headingFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.headingFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
    '@media': {
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n5,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n7,
        },
        '(width >= 96rem)': {
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
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
    '@media': {
        '(width >= 80rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n5,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n7,
        },
        '(width >= 96rem)': {
            fontSize: contract_css_1.tokens.kda.foundation.size.n5,
            lineHeight: contract_css_1.tokens.kda.foundation.size.n7,
        },
    },
});
exports.bodySmallRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: '14px',
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n4,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.bodySmallBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: '14px',
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n4,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.bodySmallestRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n3,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n4,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.bodySmallestBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n3,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n4,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.bodyBaseRegular = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.regular,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
exports.bodyBaseBold = (0, css_1.style)({
    fontFamily: contract_css_1.tokens.kda.foundation.typography.family.bodyFont,
    fontSize: contract_css_1.tokens.kda.foundation.size.n4,
    fontWeight: contract_css_1.tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: contract_css_1.tokens.kda.foundation.size.n6,
    letterSpacing: contract_css_1.tokens.kda.foundation.spacing.no,
});
//# sourceMappingURL=styles.css.js.map