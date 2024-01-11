"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const ProgressCircle_1 = require("./ProgressCircle");
(0, vitest_1.describe)('ProgressCircle', () => {
    (0, vitest_1.it)('Should handle defaults', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { "aria-label": "Progress" }));
        const progressCircle = getByRole('progressbar');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuemin', '0');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuemax', '100');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuenow', '0');
    });
    (0, vitest_1.it)('Should handle indeterminate', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { "aria-label": "Progress", isIndeterminate: true }));
        const progressCircle = getByRole('progressbar');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuemin', '0');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuemax', '100');
        (0, vitest_1.expect)(progressCircle).not.toHaveAttribute('aria-valuenow');
    });
    (0, vitest_1.it)('Should handle controlled value', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { "aria-label": "Progress", value: 30 }));
        const progressCircle = getByRole('progressbar');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuemin', '0');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuemax', '100');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuenow', '30');
    });
    (0, vitest_1.it)('Should clamp values to 0', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { "aria-label": "Progress", value: -1 }));
        const progressCircle = getByRole('progressbar');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuenow', '0');
    });
    (0, vitest_1.it)('Should clamp values to 100', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { "aria-label": "Progress", value: 1000 }));
        const progressCircle = getByRole('progressbar');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('aria-valuenow', '100');
    });
    (0, vitest_1.it)('Should support className', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { "aria-label": "Progress", className: "testClass" }));
        const progressCircle = getByRole('progressbar');
        (0, vitest_1.expect)(progressCircle).toHaveAttribute('class', vitest_1.expect.stringContaining('testClass'));
    });
    (0, vitest_1.it)('can handle negative values with minValue and maxValue', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { "aria-label": "Progress", value: 0, minValue: -5, maxValue: 5 }));
        const progressBar = getByRole('progressbar');
        (0, vitest_1.expect)(progressBar).toHaveAttribute('aria-valuenow', '0');
        (0, vitest_1.expect)(progressBar).toHaveAttribute('aria-valuetext', '50%');
    });
    (0, vitest_1.it)('warns user if no aria-label is provided', () => {
        const spyWarn = vitest_1.vi.spyOn(console, 'warn').mockImplementation(() => { });
        (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { value: 25 }));
        (0, vitest_1.expect)(spyWarn).toHaveBeenCalledWith('If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility');
    });
    (0, vitest_1.it)('supports custom DOM props', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(ProgressCircle_1.ProgressCircle, { value: 25, "aria-label": "Progress", "data-testid": "test" }));
        const progressBar = getByTestId('test');
        (0, vitest_1.expect)(progressBar).toBeInTheDocument();
    });
});
//# sourceMappingURL=ProgressCircle.spec.js.map