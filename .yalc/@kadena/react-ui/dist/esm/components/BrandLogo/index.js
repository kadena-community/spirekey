import React from 'react';
import { KadenaLogo } from './svgs/Kadena';
import { KadenaDevToolsLogo } from './svgs/KadenaDevTools';
import { KadenaDocsLogo } from './svgs/KadenaDocs';
export const logoVariants = ['Kadena', 'DevTools', 'Docs'];
const renderSwitch = (logo = 'Kadena') => {
    switch (logo) {
        case 'Docs':
            return KadenaDocsLogo;
        case 'DevTools':
            return KadenaDevToolsLogo;
        case 'Kadena':
        default:
            return KadenaLogo;
    }
};
const BrandLogo = ({ variant }) => {
    const LogoComponent = renderSwitch(variant);
    return React.createElement(LogoComponent, null);
};
export default BrandLogo;
//# sourceMappingURL=index.js.map