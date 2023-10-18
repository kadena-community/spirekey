'use client';
import { SystemIcon } from '../Icon';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { AccordionContext } from './Accordion.context';
import { accordionButtonClass, accordionContentClass, accordionHeadingTitleClass, accordionSectionClass, accordionToggleIconClass, } from './Accordion.css';
export const AccordionSection = ({ children, onClose, onOpen, title, }) => {
    const { openSections, setOpenSections, linked } = useContext(AccordionContext);
    const sectionId = title.replace(/\s+/g, '-').toLowerCase();
    const isOpen = openSections.includes(sectionId);
    const handleClick = () => {
        if (isOpen) {
            setOpenSections(linked ? [] : [...openSections.filter((i) => i !== sectionId)]);
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
        else {
            setOpenSections(linked ? [sectionId] : [...openSections, sectionId]);
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
    };
    return (React.createElement("section", { className: accordionSectionClass, "data-testid": "kda-accordion-section" },
        React.createElement("button", { className: classNames([accordionButtonClass]), onClick: handleClick },
            React.createElement("h3", { className: accordionHeadingTitleClass }, title),
            React.createElement(SystemIcon.Close, { className: classNames(accordionToggleIconClass, {
                    isOpen,
                }), size: "sm" })),
        children && isOpen && (React.createElement("div", { className: accordionContentClass }, children))));
};
//# sourceMappingURL=AccordionSection.js.map