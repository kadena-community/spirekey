"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const react_stately_1 = require("react-stately");
const Modal_1 = require("./Modal");
const TestBed = ({ isOpen, defaultOpen, onOpenChange, children, ...props }) => {
    const state = (0, react_stately_1.useOverlayTriggerState)({
        isOpen,
        defaultOpen,
        onOpenChange,
    });
    return (react_2.default.createElement(Modal_1.Modal, { state: state, ...props }, children));
};
(0, vitest_1.describe)('Modal', () => {
    (0, vitest_1.it)('should render the provided children', () => {
        (0, react_1.render)(react_2.default.createElement(TestBed, { isOpen: true },
            react_2.default.createElement("div", null, "Hello, world!")));
        (0, vitest_1.expect)(react_1.screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    (0, vitest_1.it)('should render the modal when defaultOpen is true', () => {
        (0, react_1.render)(react_2.default.createElement(TestBed, { defaultOpen: true },
            react_2.default.createElement("div", null, "Hello, world!")));
        (0, vitest_1.expect)(react_1.screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    (0, vitest_1.it)('should dismiss the modal when the escape key is pressed', async () => {
        (0, react_1.render)(react_2.default.createElement(TestBed, { defaultOpen: true },
            react_2.default.createElement("div", null, "Hello, world!")));
        await user_event_1.default.type(document.body, '{esc}');
        (0, vitest_1.expect)(react_1.screen.queryByText('Hello, world!')).not.toBeInTheDocument();
    });
    (0, vitest_1.it)('should not dismiss the modal isDismissable is false', async () => {
        const onClose = vitest_1.vi.fn();
        const TestBed2 = () => {
            const state = (0, react_stately_1.useOverlayTriggerState)({
                isOpen: true,
                onOpenChange: onClose,
            });
            return (react_2.default.createElement(Modal_1.Modal, { state: state, isDismissable: false }, (props, ref) => {
                return (react_2.default.createElement("div", { ...props, ref: ref, autoFocus: true },
                    react_2.default.createElement("div", null, "Hello, world!"),
                    react_2.default.createElement("button", { onClick: state.close }, "Close")));
            }));
        };
        (0, react_1.render)(react_2.default.createElement(TestBed2, null));
        await user_event_1.default.click(react_1.screen.getByText('Close'));
        (0, vitest_1.expect)(onClose).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=Modal.test.js.map