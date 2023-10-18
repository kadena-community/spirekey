import type { FC } from 'react';
import { ProductIcon } from '..';
import { layoutVariant } from './TrackerCard.css';
export interface ITrackerCardProps {
    labelValues: ILabelValue[];
    helperText?: string;
    helperTextType?: 'mild' | 'severe';
    icon?: keyof typeof ProductIcon;
    variant?: keyof typeof layoutVariant;
}
export interface ILabelValue {
    label: string;
    value?: string;
    isAccount?: boolean;
    defaultVisible?: boolean;
    startUnmasked?: number;
    endUnmasked?: number;
}
export declare const TrackerCard: FC<ITrackerCardProps>;
//# sourceMappingURL=TrackerCard.d.ts.map