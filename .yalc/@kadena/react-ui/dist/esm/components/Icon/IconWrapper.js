import classNames from 'classnames';
import React from 'react';
import { iconContainer, sizeVariants } from './IconWrapper.css';
export const IconWrapper = (Component) => {
    const WrappedIcon = ({ size = 'md', ...props }) => (React.createElement("span", { className: classNames(iconContainer, sizeVariants[size]) },
        React.createElement(Component, { ...props, height: "100%", width: "100%" })));
    WrappedIcon.displayName = Component.displayName;
    return WrappedIcon;
};
//# sourceMappingURL=IconWrapper.js.map