import type { ITooltipProps } from './Tooltip';
import { tooltipHandler } from './tooltipHandler';
export type { ITooltipProps };
interface ITooltip {
    Root: React.ForwardRefExoticComponent<Omit<ITooltipProps, 'ref'> & React.RefAttributes<HTMLDivElement>>;
    handler: typeof tooltipHandler;
}
export declare const Tooltip: ITooltip;
//# sourceMappingURL=index.d.ts.map