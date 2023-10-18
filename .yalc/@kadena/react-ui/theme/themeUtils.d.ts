import type { StyleRule } from '@vanilla-extract/css';
import type { Properties } from 'csstype';
export declare const breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
};
export type Breakpoint = keyof typeof breakpoints;
type CSSProps = Omit<StyleRule, '@media' | '@supports'>;
export declare const responsiveStyle: ({ xs, sm, md, lg, xl, xxl, }: Partial<Record<Breakpoint, CSSProps>>) => StyleRule;
export declare const mapToProperty: <Property extends keyof Properties<string | number, string & {}>>(property: Property, breakpoint?: Breakpoint) => (value: string | number) => StyleRule;
export {};
//# sourceMappingURL=themeUtils.d.ts.map