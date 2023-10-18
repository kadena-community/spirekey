"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = require("../Stack");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const stories_css_1 = require("./stories.css");
describe('Stack', () => {
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Stack_1.Stack, null,
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 1"),
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 2"),
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 3"),
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 4"),
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 5"),
            react_2.default.createElement("div", { className: stories_css_1.itemClass }, "Item 6")));
        const stackContainer = getByTestId('kda-stack');
        expect(stackContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Stack.test.js.map