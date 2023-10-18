import type { FC } from 'react';
export interface IPaginationProps {
    totalPages: number;
    currentPage?: number;
    label: string;
    visiblePageLimit?: number;
    initialSelectedPage?: number;
    onPageChange: (page: number) => void;
}
export declare const Pagination: FC<IPaginationProps>;
//# sourceMappingURL=Pagination.d.ts.map