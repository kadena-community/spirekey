import { atoms } from '../../styles/atoms.css';
import { style } from '@vanilla-extract/css';
export const underlayClass = style([
    atoms({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        cursor: 'pointer',
        inset: 0,
    }),
    {
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
    },
]);
//# sourceMappingURL=Modal.css.js.map