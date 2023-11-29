"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const Box_1 = require("../../Layout/Box");
(0, vitest_1.describe)('Box', () => {
    (0, vitest_1.test)('renders a box', () => {
        (0, react_1.render)(react_2.default.createElement(Box_1.Box, null, "Box"));
        (0, vitest_1.expect)(react_1.screen.getByText('Box')).toBeInTheDocument();
    });
});
//# sourceMappingURL=Box.test.js.map