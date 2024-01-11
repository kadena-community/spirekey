import React from 'react';
import { Box } from '../Box';
export const Stack = ({ children, as = 'div', display = 'flex', ...props }) => {
    return (React.createElement(Box, { as: as, display: display, ...props }, children));
};
//# sourceMappingURL=Stack.js.map