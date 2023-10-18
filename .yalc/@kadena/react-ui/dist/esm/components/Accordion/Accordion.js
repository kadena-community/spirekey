'use client';
import React, { useState } from 'react';
import { AccordionContext } from './Accordion.context';
export const AccordionRoot = ({ children, linked = false, initialOpenSection = [], }) => {
    const [openSections, setOpenSections] = useState(initialOpenSection);
    return (React.createElement(AccordionContext.Provider, { value: { openSections, setOpenSections, linked } }, children));
};
//# sourceMappingURL=Accordion.js.map