interface INavHeaderNavigationContext {
    setGlowPosition: (targetBounds: DOMRect) => void;
    setActiveHref: React.Dispatch<React.SetStateAction<string | undefined>>;
    activeHref?: string;
}
export declare const NavHeaderNavigationContext: import("react").Context<INavHeaderNavigationContext>;
export {};
//# sourceMappingURL=NavHeaderNavigation.context.d.ts.map