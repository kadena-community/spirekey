import type { FC, FunctionComponentElement } from 'react';
import type { INavAccordionLinkProps } from './NavAccordionLink';
export interface INavAccordionGroupProps {
    children: FunctionComponentElement<INavAccordionLinkProps>[];
    onClose?: () => void;
    onOpen?: () => void;
    title: string;
}
export declare const NavAccordionGroup: FC<INavAccordionGroupProps>;
//# sourceMappingURL=NavAccordionGroup.d.ts.map