declare const defaultOptions: {
    character: string;
    maskLength: number;
    headLength: number;
    tailLength: number;
};
export type MaskOptions = typeof defaultOptions;
export declare const maskValue: (value: string, options?: Partial<MaskOptions>) => string;
export {};
//# sourceMappingURL=utils.d.ts.map