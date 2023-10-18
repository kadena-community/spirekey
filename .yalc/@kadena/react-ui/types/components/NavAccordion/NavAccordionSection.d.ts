import type { FC, FunctionComponentElement as FCElement } from 'react';
import type { INavAccordionGroupProps } from './NavAccordionGroup';
import type { INavAccordionLinkProps } from './NavAccordionLink';
export interface INavAccordionSectionProps {
    children?: FCElement<INavAccordionGroupProps>[] | FCElement<INavAccordionLinkProps>[] | FCElement<INavAccordionGroupProps> | FCElement<INavAccordionLinkProps>;
    onClose?: () => void;
    onOpen?: () => void;
    title: string;
}
export declare const NavAccordionSection: FC<INavAccordionSectionProps>;
//# sourceMappingURL=NavAccordionSection.d.ts.map