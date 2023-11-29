"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const ProgressBar_1 = require("./ProgressBar");
(0, vitest_1.describe)('ProgressBar', () => {
    let checkpoints;
    (0, vitest_1.beforeEach)(() => {
        checkpoints = [
            {
                title: 'Checkpoint 1',
                status: 'complete',
            },
            {
                title: 'Checkpoint 2',
                status: 'pending',
            },
            {
                title: 'Checkpoint 3',
                status: 'incomplete',
            },
        ];
    });
    (0, vitest_1.test)('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(ProgressBar_1.ProgressBar, { checkpoints: checkpoints }));
        const progressBar = getByTestId('kda-progress-bar');
        const firstCheckpointContainer = getByTestId('kda-checkpoint-container-0');
        const secondCheckpointContainer = getByTestId('kda-checkpoint-container-1');
        const thirdCheckpointContainer = getByTestId('kda-checkpoint-container-2');
        (0, vitest_1.expect)(progressBar).toBeInTheDocument();
        (0, vitest_1.expect)(firstCheckpointContainer).toBeInTheDocument();
        (0, vitest_1.expect)(secondCheckpointContainer).toBeInTheDocument();
        (0, vitest_1.expect)(thirdCheckpointContainer).toBeInTheDocument();
    });
    (0, vitest_1.test)('displays correct content', () => {
        (0, react_1.render)(react_2.default.createElement(ProgressBar_1.ProgressBar, { checkpoints: checkpoints }));
        (0, vitest_1.expect)(react_1.screen.getByText('Checkpoint 1')).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText('Checkpoint 2')).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText('Checkpoint 3')).toBeInTheDocument();
    });
    (0, vitest_1.test)('displays correct number of checkpoints', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(ProgressBar_1.ProgressBar, { checkpoints: checkpoints.splice(0, 2) }));
        const firstCheckpointContainer = getByTestId('kda-checkpoint-container-0');
        const secondCheckpointContainer = getByTestId('kda-checkpoint-container-1');
        (0, vitest_1.expect)(firstCheckpointContainer).toBeInTheDocument();
        (0, vitest_1.expect)(secondCheckpointContainer).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.queryByTestId('kda-checkpoint-container-2')).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=ProgressBar.test.js.map