import type { FC } from 'react';
import type { IBreadcrumbsProps } from './Breadcrumbs';
import type { IBreadcrumbItemProps } from './BreadcrumbsItem';
interface IBreadcrumbs {
    Root: FC<IBreadcrumbsProps>;
    Item: FC<IBreadcrumbItemProps>;
}
export type { IBreadcrumbItemProps, IBreadcrumbsProps };
export declare const Breadcrumbs: IBreadcrumbs;
//# sourceMappingURL=index.d.ts.map