import className from 'classnames';
import React from 'react';
import { container, disabledClass, fullWidthClass, stackClass, } from './Card.css';
export const Card = ({ children, fullWidth, stack, disabled, }) => {
    const classList = className(container, {
        [stackClass]: stack,
        [fullWidthClass]: fullWidth,
        [disabledClass]: disabled,
    });
    if (disabled) {
        return (React.createElement("div", { className: classList, "data-testid": "kda-card" }, React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                const filteredChild = { ...child, props: child.props };
                return React.cloneElement(filteredChild, { disabled: true });
            }
            return child;
        })));
    }
    return (React.createElement("div", { className: classList, "data-testid": "kda-card" }, children));
};
//# sourceMappingURL=Card.js.map