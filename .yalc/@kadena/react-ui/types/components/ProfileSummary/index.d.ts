import type { FC } from 'react';
import type { IProfileSummaryLinkProps } from './ProfileSummaryLink';
import type { IProfileSummaryRootProps } from './ProfileSummaryRoot';
export { IProfileSummaryLinkProps, IProfileSummaryRootProps };
interface IProfileSummaryProps {
    Root: FC<IProfileSummaryRootProps>;
    Link: FC<IProfileSummaryLinkProps>;
}
export declare const ProfileSummary: IProfileSummaryProps;
//# sourceMappingURL=index.d.ts.map