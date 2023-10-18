import { NavHeader } from '../NavHeader';
import { render } from '@testing-library/react';
import React from 'react';
describe('NavHeader', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(React.createElement(NavHeader.Root, null));
        const navHeaderContainer = getByTestId('kda-navheader');
        expect(navHeaderContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=NavHeader.test.js.map