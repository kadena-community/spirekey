import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';
import { Box } from '../../Layout/Box';
describe('Box', () => {
    test('renders a box', () => {
        render(React.createElement(Box, null, "Box"));
        expect(screen.getByText('Box')).toBeInTheDocument();
    });
});
//# sourceMappingURL=Box.test.js.map