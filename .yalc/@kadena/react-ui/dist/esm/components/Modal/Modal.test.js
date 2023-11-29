import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useOverlayTriggerState } from 'react-stately';
import { Modal } from './Modal';
const TestBed = ({ isOpen, defaultOpen, onOpenChange, children, ...props }) => {
    const state = useOverlayTriggerState({
        isOpen,
        defaultOpen,
        onOpenChange,
    });
    return (React.createElement(Modal, { state: state, ...props }, children));
};
describe('Modal', () => {
    it('should render the provided children', () => {
        render(React.createElement(TestBed, { isOpen: true },
            React.createElement("div", null, "Hello, world!")));
        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    it('should render the modal when defaultOpen is true', () => {
        render(React.createElement(TestBed, { defaultOpen: true },
            React.createElement("div", null, "Hello, world!")));
        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    it('should dismiss the modal when the escape key is pressed', async () => {
        render(React.createElement(TestBed, { defaultOpen: true },
            React.createElement("div", null, "Hello, world!")));
        await userEvent.type(document.body, '{esc}');
        expect(screen.queryByText('Hello, world!')).not.toBeInTheDocument();
    });
    it('should not dismiss the modal isDismissable is false', async () => {
        const onClose = vi.fn();
        const TestBed2 = () => {
            const state = useOverlayTriggerState({
                isOpen: true,
                onOpenChange: onClose,
            });
            return (React.createElement(Modal, { state: state, isDismissable: false }, (props, ref) => {
                return (React.createElement("div", { ...props, ref: ref, autoFocus: true },
                    React.createElement("div", null, "Hello, world!"),
                    React.createElement("button", { onClick: state.close }, "Close")));
            }));
        };
        render(React.createElement(TestBed2, null));
        await userEvent.click(screen.getByText('Close'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=Modal.test.js.map