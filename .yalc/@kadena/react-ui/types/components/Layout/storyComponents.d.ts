import type { FC } from 'react';
export declare const defaultBoxArgs: {
    alignItems: undefined;
    borderRadius: undefined;
    bottom: undefined;
    cursor: undefined;
    display: undefined;
    flex: undefined;
    flexDirection: undefined;
    flexGrow: undefined;
    flexShrink: undefined;
    flexWrap: undefined;
    gap: undefined;
    height: undefined;
    inset: undefined;
    justifyContent: undefined;
    left: undefined;
    margin: undefined;
    marginBlock: undefined;
    marginBlockEnd: undefined;
    marginBlockStart: undefined;
    marginInline: undefined;
    marginInlineEnd: undefined;
    marginInlineStart: undefined;
    maxWidth: undefined;
    minWidth: undefined;
    overflow: undefined;
    padding: undefined;
    paddingBlock: undefined;
    paddingBlockEnd: undefined;
    paddingBlockStart: undefined;
    paddingInline: undefined;
    paddingInlineEnd: undefined;
    paddingInlineStart: undefined;
    position: undefined;
    right: undefined;
    textAlign: undefined;
    top: undefined;
    width: undefined;
    zIndex: undefined;
};
export declare const sharedStoryArgTypes: {
    overflow: {
        options: string[];
        control: {
            type: string;
        };
        description: string;
    };
    gap: {
        options: (string | undefined)[];
    };
    width: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    minWidth: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    maxWidth: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    height: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    margin: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    marginInline: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    marginBlock: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    marginBlockStart: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    marginBlockEnd: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    marginInlineStart: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    marginInlineEnd: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    padding: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    paddingInline: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    paddingBlock: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    paddingBlockStart: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    paddingBlockEnd: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    paddingInlineStart: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
    paddingInlineEnd: {
        options: (string | undefined)[];
        control: {
            type: string;
        };
    };
};
export interface ILegendProps {
    items: Array<{
        color: 'positive' | 'warning' | 'info';
        label: string;
    }>;
}
export declare const Legend: FC<ILegendProps>;
//# sourceMappingURL=storyComponents.d.ts.map