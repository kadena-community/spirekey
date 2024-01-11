export declare const colorAtoms: import("../utils/object").FlattenObject<{
    inherit: string;
    currentColor: string;
    icon: {
        base: {
            default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            bold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            '@disabled': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            inverse: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        brand: {
            primary: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                bold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@disabled': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            secondary: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                bold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@disabled': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
        };
        semantic: {
            positive: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            negative: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            warning: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            info: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
        };
    };
    text: {
        base: {
            default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            '@disabled': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            '@selected': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            inverse: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        gray: {
            default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            lighter: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            bolder: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            inverse: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        subtle: {
            default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            inverse: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        subtlest: {
            default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            inverse: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        brand: {
            primary: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            secondary: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
        };
        semantic: {
            positive: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            negative: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            warning: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            info: {
                default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                inverse: {
                    default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@hover': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    '@focus': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
        };
    };
}, "@hover" | "@disabled" | "@focus">;
export declare const atoms: ((props: {
    background?: "none" | undefined;
    backgroundColor?: "brand.primary.default" | "brand.primary.inverse.default" | "brand.secondary.default" | "brand.secondary.inverse.default" | "semantic.info.default" | "semantic.info.inverse.default" | "semantic.warning.default" | "semantic.warning.inverse.default" | "semantic.positive.default" | "semantic.positive.inverse.default" | "semantic.negative.default" | "semantic.negative.inverse.default" | "base.default" | "base.inverse.default" | "layer-1.default" | "layer-1.inverse.default" | "layer-2.default" | "layer-2.inverse.default" | "layer-3.default" | "layer-3.inverse.default" | "transparent" | undefined;
    border?: "hairline" | "normal" | "thick" | "none" | undefined;
    borderColor?: "brand.primary.default" | "brand.primary.subtle" | "brand.primary.inverse.default" | "brand.secondary.default" | "brand.secondary.subtle" | "brand.secondary.inverse.default" | "semantic.info.default" | "semantic.info.subtle" | "semantic.info.inverse.default" | "semantic.warning.default" | "semantic.warning.subtle" | "semantic.warning.inverse.default" | "semantic.positive.default" | "semantic.positive.subtle" | "semantic.positive.inverse.default" | "semantic.negative.default" | "semantic.negative.subtle" | "semantic.negative.inverse.default" | "base.default" | "base.inverse.default" | "base.bold" | "base.boldest" | "base.high-contrast" | undefined;
    borderRadius?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "round" | undefined;
    borderStyle?: "solid" | undefined;
    borderWidth?: "hairline" | "normal" | "thick" | undefined;
    bottom?: number | undefined;
    boxShadow?: "level1" | "level2" | "level3" | undefined;
    color?: "inherit" | "icon.brand.primary.default" | "icon.brand.primary.inverse.default" | "icon.brand.secondary.default" | "icon.brand.secondary.inverse.default" | "icon.semantic.info.default" | "icon.semantic.info.inverse.default" | "icon.semantic.warning.default" | "icon.semantic.warning.inverse.default" | "icon.semantic.positive.default" | "icon.semantic.positive.inverse.default" | "icon.semantic.negative.default" | "icon.semantic.negative.inverse.default" | "icon.base.default" | "icon.base.inverse.default" | "icon.base.bold" | "icon.brand.primary.bold" | "icon.brand.secondary.bold" | "text.brand.primary.default" | "text.brand.primary.inverse.default" | "text.brand.secondary.default" | "text.brand.secondary.inverse.default" | "text.semantic.info.default" | "text.semantic.info.inverse.default" | "text.semantic.warning.default" | "text.semantic.warning.inverse.default" | "text.semantic.positive.default" | "text.semantic.positive.inverse.default" | "text.semantic.negative.default" | "text.semantic.negative.inverse.default" | "text.base.default" | "text.base.inverse.default" | "text.base.@selected" | "text.subtle.default" | "text.subtle.inverse.default" | "text.gray.default" | "text.gray.inverse.default" | "text.gray.lighter" | "text.gray.bolder" | "text.subtlest.default" | "text.subtlest.inverse.default" | "currentColor" | undefined;
    cursor?: "not-allowed" | "pointer" | undefined;
    flex?: number | undefined;
    flexGrow?: number | undefined;
    flexShrink?: number | undefined;
    flexWrap?: "nowrap" | "wrap" | undefined;
    fontFamily?: "primaryFont" | "headingFont" | "codeFont" | "bodyFont" | undefined;
    fontWeight?: "headingFont.bold" | "headingFont.regular" | "headingFont.medium" | "headingFont.black" | "bodyFont.bold" | "bodyFont.regular" | "bodyFont.medium" | "bodyFont.black" | "monoFont.bold" | "monoFont.regular" | "monoFont.medium" | "monoFont.semiBold" | undefined;
    height?: "100%" | undefined;
    inset?: number | undefined;
    left?: number | undefined;
    listStyleType?: "none" | undefined;
    maxWidth?: "content.maxWidth" | undefined;
    minWidth?: "content.minWidth" | undefined;
    opacity?: number | undefined;
    outline?: "none" | undefined;
    overflow?: "hidden" | "auto" | "scroll" | "visible" | undefined;
    overflowX?: "hidden" | "auto" | "scroll" | "visible" | undefined;
    overflowY?: "hidden" | "auto" | "scroll" | "visible" | undefined;
    pointerEvents?: "none" | undefined;
    position?: "sticky" | "fixed" | "absolute" | "relative" | "static" | undefined;
    right?: number | undefined;
    textAlign?: "left" | "right" | "center" | undefined;
    textDecoration?: "none" | "underline" | undefined;
    textTransform?: "none" | "capitalize" | "lowercase" | "uppercase" | undefined;
    top?: number | undefined;
    whiteSpace?: "normal" | "nowrap" | "break-spaces" | "pre-wrap" | undefined;
    width?: "100%" | undefined;
    wordBreak?: "normal" | "break-word" | "break-all" | "keep-all" | undefined;
    zIndex?: number | undefined;
} & {
    alignItems?: "center" | "stretch" | "flex-end" | "flex-start" | {
        xs?: "center" | "stretch" | "flex-end" | "flex-start" | undefined;
        sm?: "center" | "stretch" | "flex-end" | "flex-start" | undefined;
        md?: "center" | "stretch" | "flex-end" | "flex-start" | undefined;
        lg?: "center" | "stretch" | "flex-end" | "flex-start" | undefined;
        xl?: "center" | "stretch" | "flex-end" | "flex-start" | undefined;
        xxl?: "center" | "stretch" | "flex-end" | "flex-start" | undefined;
    } | undefined;
    display?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | {
        xs?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        sm?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        md?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        lg?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        xl?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        xxl?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
    } | undefined;
    flexDirection?: "column" | "column-reverse" | "row" | "row-reverse" | {
        xs?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        sm?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        md?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        lg?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        xl?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        xxl?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
    } | undefined;
    fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "base" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl" | "12xl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "base" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl" | "12xl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "base" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl" | "12xl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "base" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl" | "12xl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "base" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl" | "12xl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "base" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl" | "12xl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "base" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl" | "11xl" | "12xl" | undefined;
    } | undefined;
    gap?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
    } | undefined;
    justifyContent?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | {
        xs?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | undefined;
        sm?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | undefined;
        md?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | undefined;
        lg?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | undefined;
        xl?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | undefined;
        xxl?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | undefined;
    } | undefined;
    lineHeight?: "lg" | "base" | {
        xs?: "lg" | "base" | undefined;
        sm?: "lg" | "base" | undefined;
        md?: "lg" | "base" | undefined;
        lg?: "lg" | "base" | undefined;
        xl?: "lg" | "base" | undefined;
        xxl?: "lg" | "base" | undefined;
    } | undefined;
    marginBlockEnd?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
    } | undefined;
    marginInlineStart?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
    } | undefined;
    marginInlineEnd?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
    } | undefined;
    marginBlockStart?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
    } | undefined;
    paddingBlockEnd?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
    } | undefined;
    paddingInlineStart?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
    } | undefined;
    paddingInlineEnd?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
    } | undefined;
    paddingBlockStart?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
    } | undefined;
    margin?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
    } | undefined;
    marginInline?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
    } | undefined;
    marginBlock?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | "auto" | undefined;
    } | undefined;
    padding?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
    } | undefined;
    paddingInline?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
    } | undefined;
    paddingBlock?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | {
        xs?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        sm?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        md?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        lg?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
        xxl?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "no" | "xxs" | "xxxl" | undefined;
    } | undefined;
}) => string) & {
    properties: Set<"border" | "width" | "zIndex" | "color" | "background" | "minWidth" | "maxWidth" | "fontSize" | "lineHeight" | "alignItems" | "backgroundColor" | "bottom" | "boxShadow" | "cursor" | "display" | "flexDirection" | "flexGrow" | "flexShrink" | "flexWrap" | "fontFamily" | "fontWeight" | "height" | "justifyContent" | "left" | "listStyleType" | "marginBlockEnd" | "marginBlockStart" | "marginInlineEnd" | "marginInlineStart" | "opacity" | "overflowX" | "overflowY" | "paddingBlockEnd" | "paddingBlockStart" | "paddingInlineEnd" | "paddingInlineStart" | "pointerEvents" | "position" | "right" | "textAlign" | "textTransform" | "top" | "whiteSpace" | "wordBreak" | "borderColor" | "borderRadius" | "borderStyle" | "borderWidth" | "flex" | "gap" | "inset" | "margin" | "marginBlock" | "marginInline" | "outline" | "overflow" | "padding" | "paddingBlock" | "paddingInline" | "textDecoration">;
};
export type Atoms = Parameters<typeof atoms>[0];
//# sourceMappingURL=atoms.css.d.ts.map