import { vars } from '../../../styles/vars.css';
import { styleVariants } from '@vanilla-extract/css';
export const itemSizeClass = styleVariants(vars.sizes, (size) => {
    return [
        {
            width: size,
            height: size,
        },
    ];
});
//# sourceMappingURL=stories.css.js.map