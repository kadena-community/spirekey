export declare const button: import("@vanilla-extract/recipes").RuntimeFn<{
    variant: {
        readonly primary: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly secondary: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly tertiary: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly warning: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly negative: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly positive: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly primaryInverted: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly secondaryInverted: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly tertiaryInverted: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly warningInverted: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly positiveInverted: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
        readonly negativeInverted: {
            readonly vars: {
                readonly [x: string]: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            };
        };
    };
    isCompact: {
        true: {
            paddingInline: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            paddingBlock: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
    isOutlined: {
        true: {
            backgroundColor: "transparent";
            outlineOffset: number;
            vars: {
                [x: string]: string;
            };
        };
    };
    isLoading: {
        true: {
            pointerEvents: "none";
        };
    };
    onlyIcon: {
        true: {
            paddingInline: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            paddingBlock: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
}>;
//# sourceMappingURL=NewButton.css.d.ts.map