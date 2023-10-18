import type { Dispatch, SetStateAction } from 'react';
export type NavAccordionState = string[];
interface INavAccordionContext {
    openSections: NavAccordionState;
    setOpenSections: Dispatch<SetStateAction<NavAccordionState>>;
    linked: boolean;
}
export declare const initialOpenSections: NavAccordionState;
export declare const NavAccordionContext: import("react").Context<INavAccordionContext>;
export {};
//# sourceMappingURL=NavAccordion.context.d.ts.map