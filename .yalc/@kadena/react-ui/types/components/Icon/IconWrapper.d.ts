import type { SVGProps } from 'react';
import React from 'react';
import { sizeVariants } from './IconWrapper.css';
export interface IIconProps {
    size?: keyof typeof sizeVariants;
}
type IconType = SVGProps<SVGSVGElement> & IIconProps;
export declare const IconWrapper: (Component: React.FC<SVGProps<SVGSVGElement>>) => React.FC<IconType>;
export {};
//# sourceMappingURL=IconWrapper.d.ts.map