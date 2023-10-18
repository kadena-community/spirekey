import type { FC, FunctionComponentElement } from 'react';
import type { INavAccordionLinkProps, INavAccordionSectionProps } from '.';
type Child = FunctionComponentElement<INavAccordionSectionProps | INavAccordionLinkProps>;
export interface INavAccordionRootProps {
    children?: Child[];
    linked?: boolean;
    darkMode?: boolean;
}
export declare const NavAccordionRoot: FC<INavAccordionRootProps>;
export {};
//# sourceMappingURL=NavAccordion.d.ts.map