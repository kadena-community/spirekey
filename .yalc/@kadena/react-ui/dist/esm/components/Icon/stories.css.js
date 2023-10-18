import { sprinkles } from '../../styles/sprinkles.css';
import { style } from '@vanilla-extract/css';
export const gridContainer = style([
    sprinkles({
        display: 'grid',
        gap: '$xl',
    }),
    {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
]);
export const gridItem = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '$xs',
        padding: '$sm',
    }),
]);
//# sourceMappingURL=stories.css.js.map