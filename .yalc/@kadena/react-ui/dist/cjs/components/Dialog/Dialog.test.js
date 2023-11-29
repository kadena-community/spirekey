"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const Dialog_1 = require("../Dialog");
(0, vitest_1.describe)('Modal', () => {
    (0, vitest_1.it)('should render the provided children', () => {
        (0, react_1.render)(react_2.default.createElement(Dialog_1.Dialog, { isOpen: true },
            react_2.default.createElement(Dialog_1.DialogContent, null, "Hello, world!")));
        (0, vitest_1.expect)(react_1.screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    (0, vitest_1.it)('should render the provided title', () => {
        (0, react_1.render)(react_2.default.createElement(Dialog_1.Dialog, { isOpen: true },
            react_2.default.createElement(Dialog_1.DialogHeader, null, "Title"),
            react_2.default.createElement(Dialog_1.DialogContent, null, "Hello, world!")));
        (0, vitest_1.expect)(react_1.screen.getByText('Hello, world!')).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByLabelText('Title')).toHaveAttribute('role', 'dialog');
    });
    (0, vitest_1.it)('should use custom aria-label correctly', () => {
        (0, react_1.render)(react_2.default.createElement(Dialog_1.Dialog, { isOpen: true, "aria-label": "my own label" },
            react_2.default.createElement(Dialog_1.DialogHeader, null, "Only Visual Title"),
            react_2.default.createElement(Dialog_1.DialogContent, null, "Hello, world!")));
        (0, vitest_1.expect)(react_1.screen.getByLabelText('my own label')).toHaveAttribute('role', 'dialog');
    });
    (0, vitest_1.it)('should render the dialog when defaultOpen is true', () => {
        (0, react_1.render)(react_2.default.createElement(Dialog_1.Dialog, { defaultOpen: true },
            react_2.default.createElement(Dialog_1.DialogContent, null, "Hello, world!")));
        (0, vitest_1.expect)(react_1.screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    (0, vitest_1.it)('should dismiss the dialog when the escape key is pressed', async () => {
        (0, react_1.render)(react_2.default.createElement(Dialog_1.Dialog, { defaultOpen: true },
            react_2.default.createElement(Dialog_1.DialogContent, null, "Hello, world!")));
        await user_event_1.default.type(document.body, '{esc}');
        (0, vitest_1.expect)(react_1.screen.queryByText('Hello, world!')).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=Dialog.test.js.map