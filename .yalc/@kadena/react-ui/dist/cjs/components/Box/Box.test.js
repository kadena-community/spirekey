"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Box_1 = require("../Box");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('Box', () => {
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Box_1.Box, null, "Hello, Box!"));
        const boxContainer = getByTestId('kda-box');
        expect(boxContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Box.test.js.map