import cn from 'classnames';
import React from 'react';
import { useSeparator } from 'react-aria';
import { dividerClass } from './Divider.css';
export const Divider = ({ className, ...props }) => {
    const { separatorProps } = useSeparator({
        ...props,
        elementType: 'hr',
        orientation: 'horizontal',
    });
    return React.createElement("hr", { className: cn(dividerClass, className), ...separatorProps });
};
//# sourceMappingURL=Divider.js.map