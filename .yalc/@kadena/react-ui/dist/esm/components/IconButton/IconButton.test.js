import { IconButton } from '../IconButton';
import { render } from '@testing-library/react';
import React from 'react';
describe('IconButton', () => {
    test('renders correctly', () => {
        const { getByTestId } = render(React.createElement(IconButton, { title: "icon-button", icon: "Account" }));
        const iconButton = getByTestId('kda-icon-button');
        expect(iconButton).toBeInTheDocument();
    });
});
//# sourceMappingURL=IconButton.test.js.map