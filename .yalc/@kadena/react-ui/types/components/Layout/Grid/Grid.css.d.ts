import { breakpoints } from '../../../styles/themeUtils';
export declare const gridContainerClass: string;
export declare const gridItemClass: string;
declare const columnCount: Record<number, number>;
export declare const rowSpanVariants: Record<number, string>;
export declare const containerColumnVariants: {
    xs: Record<number, string>;
    sm: Record<number, string>;
    md: Record<number, string>;
    lg: Record<number, string>;
    xl: Record<number, string>;
    xxl: Record<number, string>;
};
export declare const itemColumnVariants: {
    xs: Record<number, string>;
    sm: Record<number, string>;
    md: Record<number, string>;
    lg: Record<number, string>;
    xl: Record<number, string>;
    xxl: Record<number, string>;
};
export type ResponsiveInputType = number | Partial<Record<keyof typeof breakpoints, keyof typeof columnCount>>;
export {};
//# sourceMappingURL=Grid.css.d.ts.map