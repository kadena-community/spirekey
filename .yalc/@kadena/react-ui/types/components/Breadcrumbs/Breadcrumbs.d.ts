import type { FC, FunctionComponentElement } from 'react';
import React from 'react';
import type { IBreadcrumbItemProps } from './BreadcrumbsItem';
export interface IBreadcrumbsProps {
    children?: FunctionComponentElement<IBreadcrumbItemProps>[];
    icon?: React.ReactElement;
}
export declare const BreadcrumbsContainer: FC<IBreadcrumbsProps>;
//# sourceMappingURL=Breadcrumbs.d.ts.map