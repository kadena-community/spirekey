import { SystemIcon } from '../Icon';
import { FC } from 'react';
type IconProps = JSX.IntrinsicElements['i'];
export interface IButtonIconProps extends IconProps {
    icon: (typeof SystemIcon)[keyof typeof SystemIcon];
}
export declare const ButtonIcon: FC<IButtonIconProps>;
export {};
//# sourceMappingURL=ButtonIcon.d.ts.map