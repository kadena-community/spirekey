import { sprinkles } from '../../styles/sprinkles.css';
import { vars } from '../../styles/vars.css';
import { style } from '@vanilla-extract/css';
export const linkContainerClass = style([
    sprinkles({
        display: 'inline-flex',
        gap: '$2',
        color: '$primaryContrastInverted',
    }),
    {
        selectors: {
            '&:hover': {
                textDecoration: 'none',
            },
            '&:active': {
                color: vars.colors.$negativeContrastInverted,
            },
            '&:visited': {
                color: vars.colors.$tertiaryContrastInverted,
            },
        },
    },
]);
export const blockLinkClass = style({
    display: 'flex',
});
//# sourceMappingURL=Link.css.js.map