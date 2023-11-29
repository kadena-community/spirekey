"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MaskedValue_1 = require("../MaskedValue");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)('MaskedValue', () => {
    (0, vitest_1.test)('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(MaskedValue_1.MaskedValue, { value: "TestValue1234" }));
        const maskedValue = getByTestId('kda-masked-value');
        (0, vitest_1.expect)(maskedValue).toBeInTheDocument();
    });
    (0, vitest_1.test)('shows masked value by default', () => {
        (0, react_1.render)(react_2.default.createElement(MaskedValue_1.MaskedValue, { value: "TestValue1234" }));
        (0, vitest_1.expect)(react_1.screen.getByText('TestVa***1234')).toBeInTheDocument();
    });
    (0, vitest_1.test)('shows correct masked value when non default characters set', () => {
        (0, react_1.render)(react_2.default.createElement(MaskedValue_1.MaskedValue, { value: "TestValue1234", startUnmaskedValues: 1, endUnmaskedValues: 3 }));
        (0, vitest_1.expect)(react_1.screen.getByText('T****234')).toBeInTheDocument();
    });
    (0, vitest_1.test)('shows correct unmasked value', () => {
        (0, react_1.render)(react_2.default.createElement(MaskedValue_1.MaskedValue, { value: "TestValue1234", defaultVisibility: true }));
        (0, vitest_1.expect)(react_1.screen.getByText('TestValue1234')).toBeInTheDocument();
    });
    (0, vitest_1.test)('shows unmasked value when unmasked characters are greater or equal than value size', () => {
        (0, react_1.render)(react_2.default.createElement(MaskedValue_1.MaskedValue, { value: "TestValue1234", startUnmaskedValues: 8, endUnmaskedValues: 5 }));
        (0, vitest_1.expect)(react_1.screen.getByText('TestValue1234')).toBeInTheDocument();
    });
});
//# sourceMappingURL=MaskedValue.test.js.map