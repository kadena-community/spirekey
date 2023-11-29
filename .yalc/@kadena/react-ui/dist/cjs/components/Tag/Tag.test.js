"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = require("../Tag");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Tag', () => {
    (0, vitest_1.test)('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Tag_1.Tag, null, "Hello, Tag!"));
        const tagContainer = getByTestId('kda-tag');
        (0, vitest_1.expect)(tagContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Tag.test.js.map