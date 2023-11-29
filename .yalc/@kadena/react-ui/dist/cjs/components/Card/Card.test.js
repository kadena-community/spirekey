"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../Card");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Card', () => {
    (0, vitest_1.test)('renders correctly', () => {
        (0, react_1.render)(react_2.default.createElement(Card_1.Card, null, "Hello, Card!"));
        (0, vitest_1.expect)(react_1.screen.getByText('Hello, Card!')).toBeInTheDocument();
    });
});
//# sourceMappingURL=Card.test.js.map