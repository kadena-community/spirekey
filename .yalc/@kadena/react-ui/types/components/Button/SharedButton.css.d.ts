export declare const button: import("@vanilla-extract/recipes").RuntimeFn<{
    color: {
        readonly primary: {
            readonly vars: {
                readonly [x: string]: string;
            };
        };
        readonly secondary: {
            readonly vars: {
                readonly [x: string]: string;
            };
        };
        readonly warning: {
            readonly vars: {
                readonly [x: string]: string;
            };
        };
        readonly negative: {
            readonly vars: {
                readonly [x: string]: string;
            };
        };
        readonly positive: {
            readonly vars: {
                readonly [x: string]: string;
            };
        };
        readonly info: {
            readonly vars: {
                readonly [x: string]: string;
            };
        };
    };
    variant: {
        contained: {
            background: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out";
            selectors: {
                '&[data-hovered]': {
                    color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    background: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
            vars: {
                [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        alternative: {
            color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            background: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            selectors: {
                '&[data-hovered]': {
                    background: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
        };
        outlined: {
            border: `var(--${string}) solid var(--${string})` | `var(--${string}) solid var(--${string}, ${string})` | `var(--${string}) solid var(--${string}, ${number})` | `var(--${string}, ${string}) solid var(--${string})` | `var(--${string}, ${string}) solid var(--${string}, ${string})` | `var(--${string}, ${string}) solid var(--${string}, ${number})` | `var(--${string}, ${number}) solid var(--${string})` | `var(--${string}, ${number}) solid var(--${string}, ${string})` | `var(--${string}, ${number}) solid var(--${string}, ${number})`;
            outline: "none";
            color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            background: "none";
            selectors: {
                '&[data-hovered]': {
                    borderColor: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
                '&[data-pressed]': {
                    borderColor: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    outline: "none";
                };
                '&[data-focus-visible]': {
                    borderColor: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    outline: "none";
                };
                '&[data-disabled]': {
                    borderColor: string;
                    color: string;
                    background: "none";
                };
            };
        };
        text: {
            background: "none";
            color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            selectors: {
                '&[data-hovered]': {
                    color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    textDecoration: "underline";
                };
                '&[data-pressed]': {
                    color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    textDecoration: "underline";
                    outline: "none";
                };
                '&[data-focus-visible]': {
                    color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                    textDecoration: "underline";
                    outline: "none";
                };
                '&[data-disabled]': {
                    background: "none";
                };
            };
        };
    };
    isCompact: {
        true: string;
        false: string;
    };
    isLoading: {
        true: {
            pointerEvents: "none";
        };
    };
}>;
//# sourceMappingURL=SharedButton.css.d.ts.map