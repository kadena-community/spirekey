import { Breadcrumbs } from '../Breadcrumbs';
import { render } from '@testing-library/react';
import React from 'react';
describe('Breadcrumps', () => {
    test('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Breadcrumbs.Root, null));
        const boxContainer = getByTestId('kda-breadcrumbs');
        expect(boxContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Breadcrumbs.test.js.map