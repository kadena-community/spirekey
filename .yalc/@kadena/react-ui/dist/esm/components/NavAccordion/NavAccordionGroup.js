'use client';
import { accordionButtonClass } from '../Accordion/Accordion.css';
import { SystemIcon } from '../Icon';
import classNames from 'classnames';
import React, { Children, useState } from 'react';
import { navAccordionGroupButtonClass, navAccordionGroupIconClass, navAccordionGroupListClass, navAccordionGroupListItemClass, navAccordionGroupTitleClass, navAccordionListClass, } from './NavAccordion.css';
export const NavAccordionGroup = ({ children, onClose, onOpen, title, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        if (isOpen) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
        else {
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
        setIsOpen(!isOpen);
    };
    return (React.createElement("div", null,
        React.createElement("button", { className: classNames([
                accordionButtonClass,
                navAccordionGroupButtonClass,
            ]), onClick: handleClick },
            React.createElement(SystemIcon.ChevronDown, { className: classNames(navAccordionGroupIconClass, {
                    isOpen,
                }), size: "sm" }),
            React.createElement("span", { className: navAccordionGroupTitleClass }, title)),
        children && isOpen && (React.createElement("ul", { className: classNames([
                navAccordionListClass,
                navAccordionGroupListClass,
            ]) }, Children.map(children, (child) => (React.createElement("li", { className: navAccordionGroupListItemClass }, child)))))));
};
//# sourceMappingURL=NavAccordionGroup.js.map