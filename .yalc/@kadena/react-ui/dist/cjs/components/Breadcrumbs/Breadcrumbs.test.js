"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Breadcrumbs_1 = require("../Breadcrumbs");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('Breadcrumps', () => {
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Breadcrumbs_1.Breadcrumbs.Root, null));
        const boxContainer = getByTestId('kda-breadcrumbs');
        expect(boxContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Breadcrumbs.test.js.map