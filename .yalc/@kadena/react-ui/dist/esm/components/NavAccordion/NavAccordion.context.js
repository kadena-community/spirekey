import { createContext } from 'react';
export const initialOpenSections = [];
export const NavAccordionContext = createContext({
    openSections: initialOpenSections,
    setOpenSections: () => { },
    linked: false,
});
//# sourceMappingURL=NavAccordion.context.js.map