import { responsiveStyle } from '../styles/themeUtils';
import { tokens } from '../styles/tokens/contract.css';
import { style } from '@vanilla-extract/css';
export const minWidth = style(responsiveStyle({
    xs: { minWidth: '100%' },
    sm: { minWidth: tokens.kda.foundation.layout.content.minWidth },
}));
//# sourceMappingURL=storyDecorators.css.js.map