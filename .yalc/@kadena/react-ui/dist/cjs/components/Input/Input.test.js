"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = require("../Input");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('Input', () => {
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Input_1.Input, { id: "test-input" }));
        const inputContainer = getByTestId('kda-input');
        expect(inputContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Input.test.js.map