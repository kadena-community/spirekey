'use client';
import { SystemIcon } from '../Icon';
import classNames from 'classnames';
import React, { useState } from 'react';
import { treeBranchWrapperVariant, treeTitleClass, treeTitleClassWrapper, treeTitleVariant, treeToggleClass, treeToggleVariant, treeWrapperClass, } from './Tree.css';
export const TreeItem = ({ title, items, isOpen, linked = false, onOpen, onClose, }) => {
    const hasTitle = !!title;
    const hasChildren = !!(items === null || items === void 0 ? void 0 : items.length);
    const initialExpandedChildren = items === null || items === void 0 ? void 0 : items.map((item, index) => (item.isOpen ? index : undefined)).filter((item) => item !== undefined);
    const [expandedChildren, setExpandedChildren] = useState(initialExpandedChildren);
    const handleExpandChildren = (index) => {
        var _a, _b;
        if (linked) {
            expandedChildren.forEach((childrenIndex) => { var _a, _b; return (_b = (_a = items === null || items === void 0 ? void 0 : items[childrenIndex]) === null || _a === void 0 ? void 0 : _a.onClose) === null || _b === void 0 ? void 0 : _b.call(_a); });
            setExpandedChildren([index]);
        }
        else
            setExpandedChildren([...expandedChildren, index]);
        (_b = (_a = items === null || items === void 0 ? void 0 : items[index]) === null || _a === void 0 ? void 0 : _a.onOpen) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const handleCollapseChildren = (index) => {
        var _a, _b;
        setExpandedChildren(expandedChildren.filter((item) => item !== index));
        (_b = (_a = items === null || items === void 0 ? void 0 : items[index]) === null || _a === void 0 ? void 0 : _a.onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const handleToggle = () => {
        if (!hasChildren)
            return;
        if (isOpen)
            onClose === null || onClose === void 0 ? void 0 : onClose();
        else
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    };
    return (React.createElement("div", { className: treeWrapperClass, "data-testid": "kda-tree-item", role: "tree" },
        hasTitle && (React.createElement("div", { className: classNames(treeTitleClassWrapper, { isOpen }), onClick: handleToggle, role: "treeitem", "aria-selected": Boolean(isOpen), "data-testid": "kda-tree-title" },
            React.createElement("span", { className: classNames(treeToggleClass, treeToggleVariant[isOpen ? 'opened' : 'closed']) }, hasChildren ? (React.createElement(SystemIcon.ChevronDown, { size: "md" })) : (React.createElement(SystemIcon.Circle, { size: "md" }))),
            React.createElement("span", { className: classNames(treeTitleClass, treeTitleVariant[hasChildren ? 'isParent' : 'isChild']) }, title))),
        isOpen && (React.createElement("div", { className: treeBranchWrapperVariant[hasTitle ? 'isChild' : 'isParent'] }, items === null || items === void 0 ? void 0 : items.map((item, index) => {
            var _a;
            return (React.createElement(TreeItem, { key: String(item.title), title: item.title, items: (_a = item === null || item === void 0 ? void 0 : item.items) !== null && _a !== void 0 ? _a : [], isOpen: expandedChildren.includes(index), onOpen: () => handleExpandChildren(index), onClose: () => handleCollapseChildren(index), linked: Boolean(linked) }));
        })))));
};
//# sourceMappingURL=TreeItems.js.map