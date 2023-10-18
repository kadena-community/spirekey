"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StoryComponents_1 = require("./StoryComponents");
const Modal_1 = require("../Modal");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('Modal', () => {
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Modal_1.Modal, null,
            react_2.default.createElement(StoryComponents_1.Content, null)));
        const modalContainer = getByTestId('kda-modal');
        expect(modalContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Modal.test.js.map