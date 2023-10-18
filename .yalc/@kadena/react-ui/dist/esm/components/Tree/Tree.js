'use client';
import { TreeItem } from '../Tree/TreeItems';
import React, { useState } from 'react';
export const Tree = ({ title, items, isOpen: initialIsOpen = false, linked = false, onOpen, onClose, }) => {
    const [isOpen, setIsOpen] = useState(Boolean(initialIsOpen));
    const handleOpen = () => {
        setIsOpen(true);
        onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    };
    const handleClose = () => {
        setIsOpen(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    return (React.createElement(TreeItem, { key: String(title), title: title, items: items !== null && items !== void 0 ? items : [], isOpen: isOpen, onOpen: handleOpen, onClose: handleClose, linked: Boolean(linked) }));
};
//# sourceMappingURL=Tree.js.map