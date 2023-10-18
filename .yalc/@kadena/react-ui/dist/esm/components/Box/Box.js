import { sprinkles } from '../../styles/sprinkles.css';
import { createElement } from 'react';
export const Box = ({ as = 'div', display = 'block', margin = undefined, marginX = undefined, marginY = undefined, marginTop = undefined, marginBottom = undefined, marginLeft = undefined, marginRight = undefined, padding = undefined, paddingX = undefined, paddingY = undefined, paddingTop = undefined, paddingBottom = undefined, paddingLeft = undefined, paddingRight = undefined, children, }) => {
    return createElement(as, {
        className: sprinkles({
            display,
            margin,
            marginX,
            marginY,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            padding,
            paddingX,
            paddingY,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
        }),
        'data-testid': 'kda-box',
    }, children);
};
//# sourceMappingURL=Box.js.map