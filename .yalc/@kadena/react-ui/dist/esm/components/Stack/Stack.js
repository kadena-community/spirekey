import { sprinkles } from '../../styles/sprinkles.css';
import { createElement } from 'react';
export const Stack = ({ as = 'div', margin = undefined, marginX = undefined, marginY = undefined, marginTop = undefined, marginBottom = undefined, marginLeft = undefined, marginRight = undefined, gap = undefined, justifyContent = undefined, alignItems = undefined, wrap = undefined, direction = undefined, width = undefined, padding = undefined, paddingX = undefined, paddingY = undefined, paddingTop = undefined, paddingBottom = undefined, paddingLeft = undefined, paddingRight = undefined, children, }) => {
    return createElement(as, {
        className: sprinkles({
            display: 'flex',
            margin,
            marginX,
            marginY,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            gap,
            justifyContent,
            alignItems,
            flexWrap: wrap,
            flexDirection: direction,
            padding,
            paddingX,
            paddingY,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            width,
        }),
        'data-testid': 'kda-stack',
    }, children);
};
//# sourceMappingURL=Stack.js.map