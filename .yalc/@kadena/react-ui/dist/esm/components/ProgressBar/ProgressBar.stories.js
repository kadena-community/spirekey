import React from 'react';
import { ProgressBar } from './ProgressBar';
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
export default meta;
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
export const Primary = {
    name: 'ProgressBar',
    args: {
        checkpoints: testCheckpoints,
    },
    render: ({ checkpoints }) => {
        return React.createElement(ProgressBar, { checkpoints: checkpoints });
    },
};
//# sourceMappingURL=ProgressBar.stories.js.map