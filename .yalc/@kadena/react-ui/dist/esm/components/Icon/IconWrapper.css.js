import { sprinkles } from '../../styles/sprinkles.css';
import { style, styleVariants } from '@vanilla-extract/css';
export const iconContainer = style([
    sprinkles({
        display: 'block',
    }),
    {
        transform: 'translate3d(0,0,0)',
    },
]);
export const sizeVariants = styleVariants({
    xs: [sprinkles({ size: '$3' })],
    sm: [sprinkles({ size: '$4' })],
    md: [sprinkles({ size: '$6' })],
    lg: [sprinkles({ size: '$8' })],
    xl: [sprinkles({ size: '$10' })],
    heroHeader: [sprinkles({ size: '$24' })],
});
//# sourceMappingURL=IconWrapper.css.js.map