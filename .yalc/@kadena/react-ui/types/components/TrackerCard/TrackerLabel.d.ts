import React from 'react';
import { layoutVariant } from './TrackerCard.css';
export interface ILabelValue {
    label: string;
    value?: string;
    isAccount?: boolean;
    defaultVisible?: boolean;
    startUnmasked?: number;
    endUnmasked?: number;
}
export declare const TrackerLabel: ({ item, index, variant, }: {
    item: ILabelValue;
    index: number;
    variant?: "horizontal" | "vertical" | undefined;
}) => React.JSX.Element;
//# sourceMappingURL=TrackerLabel.d.ts.map