import { style } from '@vanilla-extract/css';
import { tokens } from './contract.css';
export const fontH1Regular = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n10,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: tokens.kda.foundation.size.n14,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1024px)': {
            fontSize: tokens.kda.foundation.size.n12,
            lineHeight: tokens.kda.foundation.size.n17,
        },
        '(width >= 1280px)': {
            fontSize: tokens.kda.foundation.size.n15,
            lineHeight: tokens.kda.foundation.size.n20,
        },
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n18,
            lineHeight: tokens.kda.foundation.size.n25,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n20,
            lineHeight: tokens.kda.foundation.size.n30,
        },
    },
});
export const fontH1Bold = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n10,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: tokens.kda.foundation.size.n14,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1024px)': {
            fontSize: tokens.kda.foundation.size.n12,
            lineHeight: tokens.kda.foundation.size.n17,
        },
        '(width >= 1280px)': {
            fontSize: tokens.kda.foundation.size.n15,
            lineHeight: tokens.kda.foundation.size.n20,
        },
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n18,
            lineHeight: tokens.kda.foundation.size.n25,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n20,
            lineHeight: tokens.kda.foundation.size.n30,
        },
    },
});
export const fontH2Regular = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n9,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: tokens.kda.foundation.size.n13,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: tokens.kda.foundation.size.n11,
            lineHeight: tokens.kda.foundation.size.n16,
        },
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n13,
            lineHeight: tokens.kda.foundation.size.n19,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n15,
            lineHeight: tokens.kda.foundation.size.n20,
        },
    },
});
export const fontH2Bold = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n9,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: tokens.kda.foundation.size.n13,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: tokens.kda.foundation.size.n11,
            lineHeight: tokens.kda.foundation.size.n16,
        },
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n13,
            lineHeight: tokens.kda.foundation.size.n19,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n15,
            lineHeight: tokens.kda.foundation.size.n20,
        },
    },
});
export const fontH3Regular = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n7,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: tokens.kda.foundation.size.n11,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: tokens.kda.foundation.size.n9,
            lineHeight: tokens.kda.foundation.size.n13,
        },
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n10,
            lineHeight: tokens.kda.foundation.size.n15,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n11,
            lineHeight: tokens.kda.foundation.size.n17,
        },
    },
});
export const fontH3Bold = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n7,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: tokens.kda.foundation.size.n11,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: tokens.kda.foundation.size.n9,
            lineHeight: tokens.kda.foundation.size.n13,
        },
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n10,
            lineHeight: tokens.kda.foundation.size.n15,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n11,
            lineHeight: tokens.kda.foundation.size.n17,
        },
    },
});
export const fontH4Regular = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n6,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: tokens.kda.foundation.size.n9,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: tokens.kda.foundation.size.n7,
            lineHeight: tokens.kda.foundation.size.n11,
        },
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n8,
            lineHeight: tokens.kda.foundation.size.n12,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n9,
            lineHeight: tokens.kda.foundation.size.n13,
        },
    },
});
export const fontH4Bold = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n6,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: tokens.kda.foundation.size.n9,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1280px)': {
            fontSize: tokens.kda.foundation.size.n7,
            lineHeight: tokens.kda.foundation.size.n11,
        },
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n8,
            lineHeight: tokens.kda.foundation.size.n12,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n9,
            lineHeight: tokens.kda.foundation.size.n13,
        },
    },
});
export const fontH5Regular = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n5,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: tokens.kda.foundation.size.n8,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n6,
            lineHeight: tokens.kda.foundation.size.n9,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n6,
            lineHeight: tokens.kda.foundation.size.n9,
        },
    },
});
export const fontH5Bold = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n5,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: tokens.kda.foundation.size.n8,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n6,
            lineHeight: tokens.kda.foundation.size.n9,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n6,
            lineHeight: tokens.kda.foundation.size.n9,
        },
    },
});
export const fontH6Regular = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n4,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.light,
    lineHeight: tokens.kda.foundation.size.n6,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n5,
            lineHeight: tokens.kda.foundation.size.n7,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n5,
            lineHeight: tokens.kda.foundation.size.n7,
        },
    },
});
export const fontH6Bold = style({
    fontFamily: tokens.kda.foundation.typography.family.headingFont,
    fontSize: tokens.kda.foundation.size.n4,
    fontWeight: tokens.kda.foundation.typography.weight.headingFont.bold,
    lineHeight: tokens.kda.foundation.size.n6,
    letterSpacing: tokens.kda.foundation.size.n1,
    '@media': {
        '(width >= 1536px)': {
            fontSize: tokens.kda.foundation.size.n5,
            lineHeight: tokens.kda.foundation.size.n7,
        },
        '(width >= 1980px)': {
            fontSize: tokens.kda.foundation.size.n5,
            lineHeight: tokens.kda.foundation.size.n7,
        },
    },
});
export const fontSmallRegular = style({
    fontFamily: tokens.kda.foundation.typography.family.bodyFont,
    fontSize: '14',
    fontWeight: tokens.kda.foundation.typography.weight.bodyFont.light,
    lineHeight: tokens.kda.foundation.size.n6,
    letterSpacing: tokens.kda.foundation.spacing.no,
});
export const fontSmallBold = style({
    fontFamily: tokens.kda.foundation.typography.family.bodyFont,
    fontSize: '14',
    fontWeight: tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: tokens.kda.foundation.size.n6,
    letterSpacing: tokens.kda.foundation.spacing.no,
});
export const fontSmallestRegular = style({
    fontFamily: tokens.kda.foundation.typography.family.bodyFont,
    fontSize: tokens.kda.foundation.size.n3,
    fontWeight: tokens.kda.foundation.typography.weight.bodyFont.light,
    lineHeight: tokens.kda.foundation.size.n6,
    letterSpacing: tokens.kda.foundation.spacing.no,
});
export const fontSmallestBold = style({
    fontFamily: tokens.kda.foundation.typography.family.bodyFont,
    fontSize: tokens.kda.foundation.size.n3,
    fontWeight: tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: tokens.kda.foundation.size.n6,
    letterSpacing: tokens.kda.foundation.spacing.no,
});
export const fontBaseRegular = style({
    fontFamily: tokens.kda.foundation.typography.family.bodyFont,
    fontSize: tokens.kda.foundation.size.n4,
    fontWeight: tokens.kda.foundation.typography.weight.bodyFont.light,
    lineHeight: tokens.kda.foundation.size.n6,
    letterSpacing: tokens.kda.foundation.spacing.no,
});
export const fontBaseBold = style({
    fontFamily: tokens.kda.foundation.typography.family.bodyFont,
    fontSize: tokens.kda.foundation.size.n4,
    fontWeight: tokens.kda.foundation.typography.weight.bodyFont.bold,
    lineHeight: tokens.kda.foundation.size.n6,
    letterSpacing: tokens.kda.foundation.spacing.no,
});
//# sourceMappingURL=styles.css.js.map