export declare const notificationRecipe: import("@vanilla-extract/recipes").RuntimeFn<{
    intent: Record<"info" | "warning" | "positive" | "negative", any>;
    displayStyle: {
        bordered: (string | {
            borderLeftWidth: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        })[];
        borderless: never[];
    };
}>;
export declare const closeButtonClass: string;
export declare const contentClass: string;
export declare const titleClass: string;
export declare const iconClass: string;
export declare const actionsContainerClass: string;
export declare const actionButtonIntentVariants: Record<"info" | "warning" | "positive" | "negative", string>;
export declare const actionButtonIconClass: string;
//# sourceMappingURL=Notification.css.d.ts.map