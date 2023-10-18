"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const ProgressBar_1 = require("./ProgressBar");
describe('ProgressBar', () => {
    let checkpoints;
    beforeEach(() => {
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
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(ProgressBar_1.ProgressBar, { checkpoints: checkpoints }));
        const progressBar = getByTestId('kda-progress-bar');
        const firstCheckpointContainer = getByTestId('kda-checkpoint-container-0');
        const secondCheckpointContainer = getByTestId('kda-checkpoint-container-1');
        const thirdCheckpointContainer = getByTestId('kda-checkpoint-container-2');
        expect(progressBar).toBeInTheDocument();
        expect(firstCheckpointContainer).toBeInTheDocument();
        expect(secondCheckpointContainer).toBeInTheDocument();
        expect(thirdCheckpointContainer).toBeInTheDocument();
    });
    test('displays correct content', () => {
        (0, react_1.render)(react_2.default.createElement(ProgressBar_1.ProgressBar, { checkpoints: checkpoints }));
        expect(react_1.screen.getByText('Checkpoint 1')).toBeInTheDocument();
        expect(react_1.screen.getByText('Checkpoint 2')).toBeInTheDocument();
        expect(react_1.screen.getByText('Checkpoint 3')).toBeInTheDocument();
    });
    test('displays correct number of checkpoints', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(ProgressBar_1.ProgressBar, { checkpoints: checkpoints.splice(0, 2) }));
        const firstCheckpointContainer = getByTestId('kda-checkpoint-container-0');
        const secondCheckpointContainer = getByTestId('kda-checkpoint-container-1');
        expect(firstCheckpointContainer).toBeInTheDocument();
        expect(secondCheckpointContainer).toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-checkpoint-container-2')).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=ProgressBar.test.js.map