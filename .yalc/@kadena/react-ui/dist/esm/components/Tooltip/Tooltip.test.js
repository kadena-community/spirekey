import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Tooltip } from '../Tooltip';
describe('Tooltip', () => {
    it('should render the provided children and tooltip when the children are hovered or focused', async () => {
        const messageText = 'Tooltip content';
        render(React.createElement(Tooltip, { content: messageText },
            React.createElement("button", null, "Hover me")));
        expect(screen.getByText('Hover me')).toBeInTheDocument();
        await userEvent.tab();
        expect(screen.queryByText(messageText)).toBeInTheDocument();
        await userEvent.tab();
        expect(screen.queryByText(messageText)).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=Tooltip.test.js.map