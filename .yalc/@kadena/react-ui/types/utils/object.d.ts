export type ObjectPathLeaves<T, Ignored = never> = T extends object ? {
    [K in keyof T]: `${Exclude<K, symbol | Ignored>}${T[K] extends object ? `.${ObjectPathLeaves<T[K], Ignored>}` : ''}`;
}[keyof T] : never;
export type FlattenObject<T extends object, Ignored = never> = {
    [Key in ObjectPathLeaves<T, Ignored>]: string;
};
export declare function flattenObject<T extends Record<string, unknown>, Ignored = never>(tokens: T, ignoredPaths?: readonly string[]): FlattenObject<T, Ignored>;
//# sourceMappingURL=object.d.ts.map