import type { FC } from 'react';
export declare const logoVariants: readonly ["Kadena", "DevTools", "Docs"];
export type LogoVariant = (typeof logoVariants)[number];
interface IBrandLogoProps {
    variant?: LogoVariant;
}
declare const BrandLogo: FC<IBrandLogoProps>;
export default BrandLogo;
//# sourceMappingURL=index.d.ts.map