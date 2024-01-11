import React from 'react';
import type { AriaProgressBarProps } from 'react-aria';
import type { Atoms } from '../../styles/atoms.css';
import type { ITestProps } from '../../utils/testId';
declare const SPINNER_SIZE: {
    readonly sm: 16;
    readonly md: 24;
    readonly lg: 32;
};
type SpinnerSize = keyof typeof SPINNER_SIZE;
export interface IProgressCircleProps extends AriaProgressBarProps, ITestProps {
    isIndeterminate?: boolean;
    size?: SpinnerSize;
    color?: 'currentColor' | Atoms['color'];
    className?: string;
}
export declare function ProgressCircle(props: IProgressCircleProps): React.JSX.Element;
export {};
//# sourceMappingURL=ProgressCircle.d.ts.map