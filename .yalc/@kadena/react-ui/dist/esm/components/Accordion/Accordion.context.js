import { createContext } from 'react';
export const initialOpenSections = [];
export const AccordionContext = createContext({
    openSections: initialOpenSections,
    setOpenSections: () => { },
    linked: false,
});
//# sourceMappingURL=Accordion.context.js.map