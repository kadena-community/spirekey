"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const Tooltip_1 = require("../Tooltip");
(0, vitest_1.describe)('Tooltip', () => {
    (0, vitest_1.it)('should render the provided children and tooltip when the children are hovered or focused', async () => {
        const messageText = 'Tooltip content';
        (0, react_1.render)(react_2.default.createElement(Tooltip_1.Tooltip, { content: messageText },
            react_2.default.createElement("button", null, "Hover me")));
        (0, vitest_1.expect)(react_1.screen.getByText('Hover me')).toBeInTheDocument();
        await user_event_1.default.tab();
        (0, vitest_1.expect)(react_1.screen.queryByText(messageText)).toBeInTheDocument();
        await user_event_1.default.tab();
        (0, vitest_1.expect)(react_1.screen.queryByText(messageText)).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=Tooltip.test.js.map