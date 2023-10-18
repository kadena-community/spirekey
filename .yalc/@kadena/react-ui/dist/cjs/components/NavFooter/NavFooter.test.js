"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NavFooter_1 = require("../NavFooter");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const menuLinks = [
    {
        label: 'Tutorial',
        href: 'https://kadena.io/',
    },
    {
        label: 'Documentation',
        href: 'https://kadena.io/',
    },
];
const icons = [
    {
        icon: 'Earth',
        text: 'English',
    },
    {
        icon: 'Account',
    },
];
describe('NavFooter', () => {
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(NavFooter_1.NavFooter.Root, null,
            react_2.default.createElement(NavFooter_1.NavFooter.Panel, null, menuLinks.map((item, index) => {
                return (react_2.default.createElement(NavFooter_1.NavFooter.Link, { key: index, href: item.href }, item.label));
            })),
            react_2.default.createElement(NavFooter_1.NavFooter.Panel, null, icons.map((item, index) => {
                return (react_2.default.createElement(NavFooter_1.NavFooter.IconButton, { key: index, icon: item.icon, text: item.text }));
            }))));
        const footerContainer = getByTestId('kda-footer');
        expect(footerContainer).toBeInTheDocument();
    });
    test('shows values correctly', () => {
        const { getAllByTestId } = (0, react_1.render)(react_2.default.createElement(NavFooter_1.NavFooter.Root, null,
            react_2.default.createElement(NavFooter_1.NavFooter.Panel, null, menuLinks.map((item, index) => {
                return (react_2.default.createElement(NavFooter_1.NavFooter.Link, { key: index, href: item.href }, item.label));
            })),
            react_2.default.createElement(NavFooter_1.NavFooter.Panel, null, icons.map((item, index) => {
                return (react_2.default.createElement(NavFooter_1.NavFooter.IconButton, { key: index, icon: item.icon, text: item.text }));
            }))));
        const footerPanels = getAllByTestId('kda-footer-panel');
        const menuLinksItems = getAllByTestId('kda-footer-link-item');
        const iconButtons = getAllByTestId('kda-footer-icon-item');
        expect(footerPanels).toHaveLength(2);
        expect(menuLinksItems).toHaveLength(2);
        expect(iconButtons).toHaveLength(2);
        expect(menuLinksItems[0]).toHaveTextContent('Tutorial');
        expect(iconButtons[0]).toHaveTextContent('English');
    });
});
//# sourceMappingURL=NavFooter.test.js.map