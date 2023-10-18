'use client';
import { accordionButtonClass, accordionHeadingTitleClass, accordionSectionClass, accordionToggleIconClass, } from '../Accordion/Accordion.css';
import { SystemIcon } from '../Icon';
import classNames from 'classnames';
import React, { Children, useContext } from 'react';
import { NavAccordionContext } from './NavAccordion.context';
import { navAccordionListClass, navAccordionListItemClass, } from './NavAccordion.css';
import { NavAccordionGroup } from './NavAccordionGroup';
export const NavAccordionSection = ({ children, onClose, onOpen, title, }) => {
    const { openSections, setOpenSections, linked } = useContext(NavAccordionContext);
    const sectionId = title.replace(/\s+/g, '').toLowerCase();
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
    return (React.createElement("section", { className: accordionSectionClass },
        React.createElement("button", { className: classNames([accordionButtonClass]), onClick: handleClick },
            React.createElement("h3", { className: accordionHeadingTitleClass }, title),
            React.createElement(SystemIcon.Close, { className: classNames(accordionToggleIconClass, {
                    isOpen,
                }), size: "sm" })),
        children && isOpen && (React.createElement("ul", { className: navAccordionListClass }, Children.map(children, (child) => {
            const Element = child.type === NavAccordionGroup ? 'ul' : 'li';
            const className = Element === 'ul'
                ? navAccordionListClass
                : navAccordionListItemClass;
            return React.createElement(Element, { className: className }, child);
        })))));
};
//# sourceMappingURL=NavAccordionSection.js.map