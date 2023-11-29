import type { FC, ReactElement, ReactNode } from 'react';
import type { TooltipTriggerProps } from 'react-stately';
import { tooltipPositionVariants } from './Tooltip.css';
export interface ITooltipProps extends Omit<TooltipTriggerProps, 'trigger' | 'onOpenChange'> {
    children: ReactElement;
    content: ReactNode;
    position?: keyof typeof tooltipPositionVariants;
}
export declare const Tooltip: FC<ITooltipProps>;
//# sourceMappingURL=Tooltip.d.ts.map