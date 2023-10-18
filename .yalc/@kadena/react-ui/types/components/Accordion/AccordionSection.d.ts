import type { FC } from 'react';
import React from 'react';
export interface IAccordionSectionProps {
    children?: React.ReactNode;
    onClose?: () => void;
    onOpen?: () => void;
    title: string;
}
export declare const AccordionSection: FC<IAccordionSectionProps>;
//# sourceMappingURL=AccordionSection.d.ts.map