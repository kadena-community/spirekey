import { sprinkles } from '../../styles/sprinkles.css';
import { vars } from '../../styles/vars.css';
import { style } from '@vanilla-extract/css';
export const containerClass = style([
    sprinkles({
        borderRadius: '$sm',
        width: 'min-content',
    }),
    {
        border: `1px solid ${vars.colors.$primaryHighContrast}`,
    },
]);
export const contentClass = style([
    sprinkles({
        backgroundColor: '$primarySurface',
        borderRadius: '$sm',
        padding: '$2',
        color: '$neutral3',
        display: 'flex',
        size: '$16',
        alignItems: 'center',
        justifyContent: 'center',
    }),
]);
//# sourceMappingURL=stories.css.js.map