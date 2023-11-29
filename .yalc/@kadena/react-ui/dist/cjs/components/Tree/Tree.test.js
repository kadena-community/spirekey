"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const Tree_1 = require("./Tree");
(0, vitest_1.describe)('Tree', () => {
    (0, vitest_1.test)('renders without title', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Tree_1.Tree, null));
        const treeElement = getByTestId('kda-tree-item');
        (0, vitest_1.expect)(treeElement).toBeInTheDocument();
    });
    (0, vitest_1.test)('renders with title', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Tree_1.Tree, { title: 'Example Title' }));
        const treeTitleElement = getByTestId('kda-tree-title');
        (0, vitest_1.expect)(treeTitleElement).toBeInTheDocument();
    });
    (0, vitest_1.test)('expands/collapses on click', () => {
        const onOpen = vitest_1.vi.fn();
        const onClose = vitest_1.vi.fn();
        const { getAllByTestId } = (0, react_1.render)(react_2.default.createElement(Tree_1.Tree, { title: 'Example Title', items: [{ title: 'Child Title' }], onOpen: onOpen, onClose: onClose }));
        const treeTitleElement = getAllByTestId('kda-tree-title')[0];
        (0, vitest_1.expect)(onOpen).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(treeTitleElement);
        (0, vitest_1.expect)(treeTitleElement).toHaveClass('isOpen');
        (0, vitest_1.expect)(onOpen).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(onClose).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(treeTitleElement);
        (0, vitest_1.expect)(treeTitleElement).not.toHaveClass('isOpen');
        (0, vitest_1.expect)(onOpen).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(onClose).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.test)('expands/collapses on click while linked prop is true', () => {
        const onOpenFirst = vitest_1.vi.fn();
        const onCloseFirst = vitest_1.vi.fn();
        const onOpenSecond = vitest_1.vi.fn();
        const onCloseSecond = vitest_1.vi.fn();
        const { getAllByTestId } = (0, react_1.render)(react_2.default.createElement(Tree_1.Tree, { title: 'Example Title', isOpen: true, linked: true, items: [
                {
                    title: 'First Child Title',
                    onOpen: onOpenFirst,
                    onClose: onCloseFirst,
                    items: [{ title: 'Grand child' }],
                },
                {
                    title: 'Second Child Title',
                    onOpen: onOpenSecond,
                    onClose: onCloseSecond,
                    items: [{ title: 'Grand child' }],
                },
            ] }));
        const treeTitleElement = getAllByTestId('kda-tree-title')[0];
        (0, vitest_1.expect)(treeTitleElement).toHaveClass('isOpen');
        const firstTitle = getAllByTestId('kda-tree-title')[1];
        const secondTitle = getAllByTestId('kda-tree-title')[2];
        (0, vitest_1.expect)(firstTitle).toBeInTheDocument();
        (0, vitest_1.expect)(secondTitle).toBeInTheDocument();
        (0, vitest_1.expect)(onOpenFirst).toHaveBeenCalledTimes(0);
        (0, vitest_1.expect)(onCloseFirst).toHaveBeenCalledTimes(0);
        (0, vitest_1.expect)(onOpenSecond).toHaveBeenCalledTimes(0);
        (0, vitest_1.expect)(onCloseSecond).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(firstTitle);
        (0, vitest_1.expect)(onOpenFirst).toHaveBeenCalledTimes(1);
        react_1.fireEvent.click(secondTitle);
        (0, vitest_1.expect)(onCloseFirst).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(onOpenSecond).toHaveBeenCalledTimes(1);
        react_1.fireEvent.click(secondTitle);
        (0, vitest_1.expect)(onCloseSecond).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.test)('renders child items when expanded, and callbacks should not get called when there is no grand child', () => {
        const onChildOpen = vitest_1.vi.fn();
        const onChildClose = vitest_1.vi.fn();
        const { getAllByTestId } = (0, react_1.render)(react_2.default.createElement(Tree_1.Tree, { title: 'Example Title', items: [
                {
                    title: 'Child Title',
                    onOpen: onChildOpen,
                    onClose: onChildClose,
                },
            ] }));
        const treeTitleElement = getAllByTestId('kda-tree-title')[0];
        react_1.fireEvent.click(treeTitleElement);
        const treeChildTitleElement = getAllByTestId('kda-tree-title')[1];
        (0, vitest_1.expect)(treeChildTitleElement).toBeInTheDocument();
        (0, vitest_1.expect)(onChildOpen).toHaveBeenCalledTimes(0);
        (0, vitest_1.expect)(onChildClose).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(treeChildTitleElement);
        (0, vitest_1.expect)(onChildOpen).toHaveBeenCalledTimes(0);
        (0, vitest_1.expect)(onChildClose).toHaveBeenCalledTimes(0);
    });
    (0, vitest_1.test)('renders child items when expanded, and callbacks should get called when there is grand child', () => {
        const onChildOpen = vitest_1.vi.fn();
        const onChildClose = vitest_1.vi.fn();
        const { getAllByTestId } = (0, react_1.render)(react_2.default.createElement(Tree_1.Tree, { title: 'Example Title', items: [
                {
                    title: 'Child Title',
                    onOpen: onChildOpen,
                    onClose: onChildClose,
                    items: [{ title: 'grand child' }],
                },
            ] }));
        const treeTitleElement = getAllByTestId('kda-tree-title')[0];
        react_1.fireEvent.click(treeTitleElement);
        const treeChildTitleElement = getAllByTestId('kda-tree-title')[1];
        (0, vitest_1.expect)(treeChildTitleElement).toBeInTheDocument();
        (0, vitest_1.expect)(onChildOpen).toHaveBeenCalledTimes(0);
        (0, vitest_1.expect)(onChildClose).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(treeChildTitleElement);
        (0, vitest_1.expect)(onChildOpen).toHaveBeenCalledTimes(1);
        react_1.fireEvent.click(treeChildTitleElement);
        (0, vitest_1.expect)(onChildClose).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=Tree.test.js.map