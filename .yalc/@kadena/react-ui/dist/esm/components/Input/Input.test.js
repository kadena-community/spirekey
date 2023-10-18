import { Input } from '../Input';
import { render } from '@testing-library/react';
import React from 'react';
describe('Input', () => {
    test('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Input, { id: "test-input" }));
        const inputContainer = getByTestId('kda-input');
        expect(inputContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Input.test.js.map