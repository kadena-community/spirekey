import type { FC } from 'react';
import type { INavAccordionRootProps } from './NavAccordion';
import type { INavAccordionGroupProps } from './NavAccordionGroup';
import type { INavAccordionLinkProps } from './NavAccordionLink';
import type { INavAccordionSectionProps } from './NavAccordionSection';
export { INavAccordionGroupProps, INavAccordionLinkProps, INavAccordionRootProps, INavAccordionSectionProps, };
export interface INavAccordionProps {
    Root: FC<INavAccordionRootProps>;
    Section: FC<INavAccordionSectionProps>;
    Group: FC<INavAccordionGroupProps>;
    Link: FC<INavAccordionLinkProps>;
}
export declare const NavAccordion: INavAccordionProps;
//# sourceMappingURL=index.d.ts.map