"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const react_1 = __importDefault(require("react"));
const ProgressBar_1 = require("./ProgressBar");
const meta = {
    title: 'Components/ProgressBar',
    parameters: {
        docs: {
            description: {
                component: 'A component that shows the completion status of a task or process.',
            },
        },
    },
    argTypes: {
        checkpoints: {
            control: {
                type: 'object',
                description: 'Each checkpoint has a <i>title</i> and a <i>status</i>.',
            },
        },
    },
};
exports.default = meta;
const testCheckpoints = [
    {
        title: 'Checkpoint 1',
        status: 'complete',
    },
    {
        title: 'Checkpoint 2',
        status: 'complete',
    },
    {
        title: 'Checkpoint 3',
        status: 'pending',
    },
    {
        title: 'Checkpoint 4',
        status: 'incomplete',
    },
];
exports.Primary = {
    name: 'ProgressBar',
    args: {
        checkpoints: testCheckpoints,
    },
    render: ({ checkpoints }) => {
        return react_1.default.createElement(ProgressBar_1.ProgressBar, { checkpoints: checkpoints });
    },
};
//# sourceMappingURL=ProgressBar.stories.js.map