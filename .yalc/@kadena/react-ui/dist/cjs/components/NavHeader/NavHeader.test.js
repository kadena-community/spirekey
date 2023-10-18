"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NavHeader_1 = require("../NavHeader");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('NavHeader', () => {
    it('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(NavHeader_1.NavHeader.Root, null));
        const navHeaderContainer = getByTestId('kda-navheader');
        expect(navHeaderContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=NavHeader.test.js.map