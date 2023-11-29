import { sprinkles } from '../../../styles/sprinkles.css';
import { vars } from '../../../styles/vars.css';
import { styleVariants } from '@vanilla-extract/css';
import { statusColor, statusOutlineColor } from '../Form.css';
import { helperIconColor, helperTextColor, } from './FormFieldHelper/FormFieldHelper.css';
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
            [statusOutlineColor]: vars.colors[`$${status}Surface`],
            [helperTextColor]: vars.colors[`$${status}ContrastInverted`],
        },
    };
});
//# sourceMappingURL=FormFieldWrapper.css.js.map