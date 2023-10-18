import type { FC } from 'react';
import type { IAccordionRootProps } from './Accordion';
import type { IAccordionSectionProps } from './AccordionSection';
export { IAccordionRootProps, IAccordionSectionProps };
export interface IAccordionProps {
    Root: FC<IAccordionRootProps>;
    Section: FC<IAccordionSectionProps>;
}
export declare const Accordion: IAccordionProps;
//# sourceMappingURL=index.d.ts.map