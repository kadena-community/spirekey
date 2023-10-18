"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IconButton_1 = require("../IconButton");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('IconButton', () => {
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(IconButton_1.IconButton, { title: "icon-button", icon: "Account" }));
        const iconButton = getByTestId('kda-icon-button');
        expect(iconButton).toBeInTheDocument();
    });
});
//# sourceMappingURL=IconButton.test.js.map