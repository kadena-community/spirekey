import type { FC, FunctionComponentElement } from 'react';
import type { IAccordionSectionProps } from '.';
import type { OpenSections } from './Accordion.context';
export interface IAccordionRootProps {
    children?: FunctionComponentElement<IAccordionSectionProps>[];
    linked?: boolean;
    initialOpenSection?: OpenSections;
}
export declare const AccordionRoot: FC<IAccordionRootProps>;
//# sourceMappingURL=Accordion.d.ts.map