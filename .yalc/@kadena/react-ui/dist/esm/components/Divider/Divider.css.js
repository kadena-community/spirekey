import { sprinkles } from '../../styles/sprinkles.css';
import { vars } from '../../styles/vars.css';
import { style } from '@vanilla-extract/css';
export const dividerClass = style([
    sprinkles({
        backgroundColor: '$borderDefault',
        width: '100%',
        marginY: '$10',
        border: 'none',
    }),
    {
        height: vars.borderWidths.$sm,
    },
]);
//# sourceMappingURL=Divider.css.js.map