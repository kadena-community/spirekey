import type { StyleRule } from '@vanilla-extract/css';
import type { Properties } from 'csstype';
import type { FlattenObject, ObjectPathLeaves } from '../utils/object';
import { tokens } from './tokens/contract.css';
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
type Token = string | {
    [key: string]: Token;
};
declare const ignoredTokens: readonly ["@hover", "@focus", "@disabled"];
type IgnoredToken = (typeof ignoredTokens)[number];
export declare function flattenTokens<T extends Record<string, Token>>(tokens: T): FlattenObject<T, IgnoredToken>;
export declare function token(path: ObjectPathLeaves<typeof tokens.kda.foundation>, fallback?: string): string;
export {};
//# sourceMappingURL=themeUtils.d.ts.map