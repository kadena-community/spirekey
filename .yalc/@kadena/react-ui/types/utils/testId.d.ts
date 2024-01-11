export interface ITestProps {
    'data-testid'?: string;
}
export declare const testProps: (props: ITestProps, postfix?: string) => {
    'data-testid': string;
} | {
    'data-testid'?: undefined;
};
export declare const withTestProps: (props: ITestProps) => {
    'data-testid': string;
} | {
    'data-testid'?: string | undefined;
};
//# sourceMappingURL=testId.d.ts.map