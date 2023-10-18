import { Stack } from '../Stack';
import { render } from '@testing-library/react';
import React from 'react';
import { itemClass } from './stories.css';
describe('Stack', () => {
    test('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Stack, null,
            React.createElement("div", { className: itemClass }, "Item 1"),
            React.createElement("div", { className: itemClass }, "Item 2"),
            React.createElement("div", { className: itemClass }, "Item 3"),
            React.createElement("div", { className: itemClass }, "Item 4"),
            React.createElement("div", { className: itemClass }, "Item 5"),
            React.createElement("div", { className: itemClass }, "Item 6")));
        const stackContainer = getByTestId('kda-stack');
        expect(stackContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Stack.test.js.map