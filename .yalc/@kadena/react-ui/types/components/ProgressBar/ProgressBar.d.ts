import type { FC } from 'react';
export interface IProgressBarProps {
    checkpoints: ICheckpoint[];
}
export interface ICheckpoint {
    title: string;
    status: 'complete' | 'pending' | 'incomplete';
}
export declare const ProgressBar: FC<IProgressBarProps>;
//# sourceMappingURL=ProgressBar.d.ts.map