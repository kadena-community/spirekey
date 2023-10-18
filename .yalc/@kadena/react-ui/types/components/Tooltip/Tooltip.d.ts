import React from 'react';
export interface ITooltipProps {
    placement?: 'top' | 'bottom' | 'left' | 'right';
    children: React.ReactNode;
}
export declare const Tooltip: React.ForwardRefExoticComponent<Omit<ITooltipProps, 'ref'> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Tooltip.d.ts.map