import { Content } from './StoryComponents';
import { Modal } from '../Modal';
import { render } from '@testing-library/react';
import React from 'react';
describe('Modal', () => {
    test('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Modal, null,
            React.createElement(Content, null)));
        const modalContainer = getByTestId('kda-modal');
        expect(modalContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Modal.test.js.map