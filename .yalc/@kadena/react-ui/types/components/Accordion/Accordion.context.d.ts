import type { Dispatch, SetStateAction } from 'react';
export type OpenSections = string[];
interface IAccordionContext {
    openSections: OpenSections;
    setOpenSections: Dispatch<SetStateAction<OpenSections>>;
    linked: boolean;
}
export declare const initialOpenSections: OpenSections;
export declare const AccordionContext: import("react").Context<IAccordionContext>;
export {};
//# sourceMappingURL=Accordion.context.d.ts.map