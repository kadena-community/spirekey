import { Box } from '../Box';
import { render } from '@testing-library/react';
import React from 'react';
describe('Box', () => {
    test('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Box, null, "Hello, Box!"));
        const boxContainer = getByTestId('kda-box');
        expect(boxContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Box.test.js.map