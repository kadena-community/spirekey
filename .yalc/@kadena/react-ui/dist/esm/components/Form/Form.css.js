import { colorPalette } from '../../styles/colors';
import { sprinkles } from '../../styles/sprinkles.css';
import { darkThemeClass, vars } from '../../styles/vars.css';
import { createVar, fallbackVar, style } from '@vanilla-extract/css';
export const statusColor = createVar();
export const statusOutlineColor = createVar();
export const baseOutlinedClass = style([
    {
        outline: `2px solid ${fallbackVar(statusOutlineColor, vars.colors.$gray30)}`,
        selectors: {
            [`${darkThemeClass} &`]: {
                outline: `2px solid ${fallbackVar(statusOutlineColor, vars.colors.$gray60)}`,
            },
        },
    },
]);
export const baseContainerClass = style([
    sprinkles({
        alignItems: 'stretch',
        borderRadius: '$sm',
        display: 'flex',
        color: '$foreground',
        overflow: 'hidden',
        lineHeight: '$lg',
        bg: {
            lightMode: '$white',
            darkMode: '$gray100',
        },
    }),
    {
        position: 'relative',
        boxShadow: `0px 1px 0 0 ${colorPalette.$gray30}`,
        outlineOffset: '2px',
        selectors: {
            [`${darkThemeClass} &`]: {
                boxShadow: `0px 1px 0 0 ${colorPalette.$gray60}`,
            },
            '&:focus-within': {
                outline: `2px solid ${fallbackVar(statusColor, vars.colors.$blue60)}`,
                outlineOffset: '2px',
            },
        },
    },
]);
//# sourceMappingURL=Form.css.js.map