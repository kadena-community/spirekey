import type { FC, FunctionComponentElement } from 'react';
import type { IProfileSummaryLinkProps } from './ProfileSummaryLink';
export interface IProfileSummaryRootProps {
    name: string;
    title: string;
    imageSrc: string;
    tags?: string[];
    children: FunctionComponentElement<IProfileSummaryLinkProps>[];
}
export declare const ProfileSummaryRoot: FC<IProfileSummaryRootProps>;
//# sourceMappingURL=ProfileSummaryRoot.d.ts.map