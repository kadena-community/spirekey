import { NavFooter } from '../NavFooter';
import { render } from '@testing-library/react';
import React from 'react';
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
        const { getByTestId } = render(React.createElement(NavFooter.Root, null,
            React.createElement(NavFooter.Panel, null, menuLinks.map((item, index) => {
                return (React.createElement(NavFooter.Link, { key: index, href: item.href }, item.label));
            })),
            React.createElement(NavFooter.Panel, null, icons.map((item, index) => {
                return (React.createElement(NavFooter.IconButton, { key: index, icon: item.icon, text: item.text }));
            }))));
        const footerContainer = getByTestId('kda-footer');
        expect(footerContainer).toBeInTheDocument();
    });
    test('shows values correctly', () => {
        const { getAllByTestId } = render(React.createElement(NavFooter.Root, null,
            React.createElement(NavFooter.Panel, null, menuLinks.map((item, index) => {
                return (React.createElement(NavFooter.Link, { key: index, href: item.href }, item.label));
            })),
            React.createElement(NavFooter.Panel, null, icons.map((item, index) => {
                return (React.createElement(NavFooter.IconButton, { key: index, icon: item.icon, text: item.text }));
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