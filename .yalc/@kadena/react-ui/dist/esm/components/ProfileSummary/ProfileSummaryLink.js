import { Link } from '../Link';
import React from 'react';
export const ProfileSummaryLink = ({ children, ...restLinkProps }) => {
    return (React.createElement("li", null,
        React.createElement(Link, { ...restLinkProps }, children)));
};
//# sourceMappingURL=ProfileSummaryLink.js.map