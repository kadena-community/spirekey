"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../Card");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('Card', () => {
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Card_1.Card, null, "Hello, Card!"));
        const cardContainer = getByTestId('kda-card');
        expect(cardContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Card.test.js.map