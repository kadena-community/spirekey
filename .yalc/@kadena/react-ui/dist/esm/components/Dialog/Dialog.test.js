import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Dialog, DialogContent, DialogHeader } from '../Dialog';
describe('Modal', () => {
    it('should render the provided children', () => {
        render(React.createElement(Dialog, { isOpen: true },
            React.createElement(DialogContent, null, "Hello, world!")));
        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    it('should render the provided title', () => {
        render(React.createElement(Dialog, { isOpen: true },
            React.createElement(DialogHeader, null, "Title"),
            React.createElement(DialogContent, null, "Hello, world!")));
        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
        expect(screen.getByLabelText('Title')).toHaveAttribute('role', 'dialog');
    });
    it('should use custom aria-label correctly', () => {
        render(React.createElement(Dialog, { isOpen: true, "aria-label": "my own label" },
            React.createElement(DialogHeader, null, "Only Visual Title"),
            React.createElement(DialogContent, null, "Hello, world!")));
        expect(screen.getByLabelText('my own label')).toHaveAttribute('role', 'dialog');
    });
    it('should render the dialog when defaultOpen is true', () => {
        render(React.createElement(Dialog, { defaultOpen: true },
            React.createElement(DialogContent, null, "Hello, world!")));
        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    it('should dismiss the dialog when the escape key is pressed', async () => {
        render(React.createElement(Dialog, { defaultOpen: true },
            React.createElement(DialogContent, null, "Hello, world!")));
        await userEvent.type(document.body, '{esc}');
        expect(screen.queryByText('Hello, world!')).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=Dialog.test.js.map