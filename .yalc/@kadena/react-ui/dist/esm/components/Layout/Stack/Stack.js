import { sprinkles } from '../../../styles/sprinkles.css';
import classnames from 'classnames';
import { createElement } from 'react';
export const Stack = ({ className, children, alignItems, as = 'div', direction, gap, justifyContent, height, margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, maxHeight, maxWidth, minHeight, minWidth, overflow, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, paddingX, paddingY, width, wrap, }) => {
    return createElement(as, {
        className: classnames(sprinkles({
            alignItems,
            display: 'flex',
            flexDirection: direction,
            flexWrap: wrap,
            gap,
            justifyContent,
            height,
            margin,
            marginBottom,
            marginLeft,
            marginRight,
            marginTop,
            marginX,
            marginY,
            maxHeight,
            maxWidth,
            minHeight,
            minWidth,
            overflow,
            padding,
            paddingBottom,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingX,
            paddingY,
            width,
        }), className),
    }, children);
};
//# sourceMappingURL=Stack.js.map