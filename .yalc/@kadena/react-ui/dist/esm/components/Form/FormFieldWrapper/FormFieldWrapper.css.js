import { atoms } from '../../../styles/atoms.css';
import { tokens } from '../../../styles/tokens/contract.css';
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
    var _a, _b, _c, _d;
    if (status === 'disabled') {
        return [atoms({ pointerEvents: 'none' }), { opacity: 0.4 }];
    }
    return {
        vars: {
            [helperIconColor]: (_a = tokens.kda.foundation.color.icon.semantic[status]) === null || _a === void 0 ? void 0 : _a.default,
            [statusColor]: (_b = tokens.kda.foundation.color.border.semantic[status]) === null || _b === void 0 ? void 0 : _b['@focus'],
            [statusOutlineColor]: (_c = tokens.kda.foundation.color.border.semantic[status]) === null || _c === void 0 ? void 0 : _c.subtle,
            [helperTextColor]: (_d = tokens.kda.foundation.color.text.semantic[status]) === null || _d === void 0 ? void 0 : _d.default,
        },
    };
});
//# sourceMappingURL=FormFieldWrapper.css.js.map