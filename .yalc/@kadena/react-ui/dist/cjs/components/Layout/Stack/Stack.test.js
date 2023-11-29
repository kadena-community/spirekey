"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = require("../../Layout/Stack");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const stories_css_1 = require("../stories.css");
(0, vitest_1.describe)('Stack', () => {
    (0, vitest_1.test)('renders correctly', () => {
        (0, react_1.render)(react_2.default.createElement(Stack_1.Stack, null,
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 1"),
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 2"),
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 3")));
        (0, vitest_1.expect)(react_1.screen.getByText('Item 1')).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText('Item 2')).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText('Item 3')).toBeInTheDocument();
    });
});
//# sourceMappingURL=Stack.test.js.map