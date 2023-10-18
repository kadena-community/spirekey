import { sprinkles } from '../../styles/sprinkles.css';
import { vars } from '../../styles/vars.css';
import { createVar, styleVariants } from '@vanilla-extract/css';
import { helperIconColor, helperTextColor, } from './InputHelper/InputHelper.css';
export const statusColor = createVar();
const statusOptions = {
    disabled: 'disabled',
    positive: 'positive',
    warning: 'warning',
    negative: 'negative',
};
export const statusVariant = styleVariants(statusOptions, (status) => {
    if (status === 'disabled') {
        return [sprinkles({ pointerEvents: 'none' }), { opacity: 0.4 }];
    }
    return {
        vars: {
            [helperIconColor]: vars.colors[`$${status}Accent`],
            [statusColor]: vars.colors[`$${status}Accent`],
            [helperTextColor]: vars.colors[`$${status}ContrastInverted`],
        },
    };
});
//# sourceMappingURL=InputWrapper.css.js.map