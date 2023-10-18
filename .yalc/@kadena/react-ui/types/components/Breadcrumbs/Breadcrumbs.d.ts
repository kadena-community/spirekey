import { ProductIcon } from '../Icon';
import type { FC, FunctionComponentElement } from 'react';
import type { IBreadcrumbItemProps } from './BreadcrumbsItem';
export interface IBreadcrumbsProps {
    children?: FunctionComponentElement<IBreadcrumbItemProps>[];
    icon?: keyof typeof ProductIcon;
}
export declare const BreadcrumbsContainer: FC<IBreadcrumbsProps>;
//# sourceMappingURL=Breadcrumbs.d.ts.map