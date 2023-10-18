import { SystemIcon } from '../Icon';
import type { FC } from 'react';
export interface IContentHeaderProps {
    icon: keyof typeof SystemIcon;
    heading: string;
    description?: string;
}
export declare const ContentHeader: FC<IContentHeaderProps>;
//# sourceMappingURL=ContentHeader.d.ts.map