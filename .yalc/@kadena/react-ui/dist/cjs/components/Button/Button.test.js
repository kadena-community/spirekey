"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("../Button");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('Button', () => {
    it('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Button_1.Button, { title: "Button" }, "Hello, Button!"));
        const buttonContainer = getByTestId('kda-button');
        expect(buttonContainer).toBeInTheDocument();
    });
    it('disables the button when `disabled` prop is true', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Button_1.Button, { title: "Button", disabled: true }, "Hello, Button!"));
        const buttonContainer = getByTestId('kda-button');
        expect(buttonContainer.disabled).toBe(true);
    });
    it('renders as an anchor element when `as` prop = "a"', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Button_1.Button, { title: "Button", as: "a", href: "https://kadena.io/" }, "Hello, Button!"));
        const buttonContainer = getByTestId('kda-button');
        expect(buttonContainer.nodeName === 'A').toBe(true);
    });
    it('requires the `href` prop to be set when rendered as anchor', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Button_1.Button, { title: "Button", as: "a" }, "Hello, Button!"));
        const buttonContainer = getByTestId('kda-button');
        expect(buttonContainer.nodeName === 'BUTTON').toBe(true);
    });
});
//# sourceMappingURL=Button.test.js.map