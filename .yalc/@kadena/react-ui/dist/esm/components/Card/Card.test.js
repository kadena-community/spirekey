import { Card } from '../Card';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';
describe('Card', () => {
    test('renders correctly', () => {
        render(React.createElement(Card, null, "Hello, Card!"));
        expect(screen.getByText('Hello, Card!')).toBeInTheDocument();
    });
});
//# sourceMappingURL=Card.test.js.map