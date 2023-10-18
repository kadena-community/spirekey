import { Card } from '../Card';
import { render } from '@testing-library/react';
import React from 'react';
describe('Card', () => {
    test('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Card, null, "Hello, Card!"));
        const cardContainer = getByTestId('kda-card');
        expect(cardContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Card.test.js.map