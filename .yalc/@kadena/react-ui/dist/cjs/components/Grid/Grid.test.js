"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = require("../Grid");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('Grid', () => {
    test('root renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Grid_1.Grid.Root, null, "Hello, Grid!"));
        const cardContainer = getByTestId('kda-grid-root');
        expect(cardContainer).toBeInTheDocument();
    });
    test('item renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Grid_1.Grid.Item, null, "Hello, Grid!"));
        const cardContainer = getByTestId('kda-grid-item');
        expect(cardContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Grid.test.js.map