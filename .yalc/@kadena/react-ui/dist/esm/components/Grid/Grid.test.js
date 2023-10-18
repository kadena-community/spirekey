import { Grid } from '../Grid';
import { render } from '@testing-library/react';
import React from 'react';
describe('Grid', () => {
    test('root renders correctly', () => {
        const { getByTestId } = render(React.createElement(Grid.Root, null, "Hello, Grid!"));
        const cardContainer = getByTestId('kda-grid-root');
        expect(cardContainer).toBeInTheDocument();
    });
    test('item renders correctly', () => {
        const { getByTestId } = render(React.createElement(Grid.Item, null, "Hello, Grid!"));
        const cardContainer = getByTestId('kda-grid-item');
        expect(cardContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Grid.test.js.map