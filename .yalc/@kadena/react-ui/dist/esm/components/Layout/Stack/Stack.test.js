import { Stack } from '../../Layout/Stack';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';
import { itemClass } from '../stories.css';
describe('Stack', () => {
    test('renders correctly', () => {
        render(React.createElement(Stack, null,
            React.createElement("div", { className: itemClass }, "Item 1"),
            React.createElement("div", { className: itemClass }, "Item 2"),
            React.createElement("div", { className: itemClass }, "Item 3")));
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
});
//# sourceMappingURL=Stack.test.js.map