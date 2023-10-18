"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heading = exports.boldVariants = exports.elementVariants = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const recipes_1 = require("@vanilla-extract/recipes");
const typography_css_1 = require("../typography.css");
exports.elementVariants = {
    h1: [
        (0, sprinkles_css_1.sprinkles)({
            fontSize: {
                xs: '$5xl',
                md: '$7xl',
                lg: '$9xl',
                xl: '$10xl',
                xxl: '$12xl',
            },
        }),
    ],
    h2: [
        (0, sprinkles_css_1.sprinkles)({
            fontWeight: '$bold',
            fontSize: {
                xs: '$4xl',
                lg: '$6xl',
                xl: '$8xl',
                xxl: '$9xl',
            },
        }),
    ],
    h3: [
        (0, sprinkles_css_1.sprinkles)({
            fontSize: {
                xs: '$2xl',
                lg: '$4xl',
                xl: '$5xl',
                xxl: '$6xl',
            },
        }),
    ],
    h4: [
        (0, sprinkles_css_1.sprinkles)({
            fontSize: {
                xs: '$xl',
                lg: '$2xl',
                xl: '$3xl',
                xxl: '$4xl',
            },
        }),
    ],
    h5: [
        (0, sprinkles_css_1.sprinkles)({
            fontSize: {
                xs: '$lg',
                xl: '$xl',
                xxl: '$4xl',
            },
        }),
    ],
    h6: [
        (0, sprinkles_css_1.sprinkles)({
            fontSize: {
                xs: '$base',
                xl: '$md',
                xxl: '$lg',
            },
        }),
    ],
};
exports.boldVariants = {
    true: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$semiBold' })],
    false: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$normal' })],
};
exports.heading = (0, recipes_1.recipe)({
    variants: {
        variant: exports.elementVariants,
        font: typography_css_1.fontVariants,
        bold: exports.boldVariants,
        transform: typography_css_1.transformVariants,
        color: typography_css_1.colorVariants,
    },
    compoundVariants: [
        {
            variants: {
                variant: 'h1',
                bold: true,
            },
            style: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$bold' })],
        },
        {
            variants: {
                font: 'main',
                variant: 'h1',
                bold: false,
            },
            style: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$light' })],
        },
        {
            variants: {
                variant: 'h2',
                bold: true,
            },
            style: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$bold' })],
        },
        {
            variants: {
                font: 'main',
                variant: 'h2',
                bold: false,
            },
            style: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$light' })],
        },
    ],
    defaultVariants: {
        variant: 'h1',
        font: 'main',
        bold: true,
        color: 'default',
        transform: 'none',
    },
});
//# sourceMappingURL=Heading.css.js.map