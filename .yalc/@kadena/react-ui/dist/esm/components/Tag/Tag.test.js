import { Tag } from '../Tag';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';
describe('Tag', () => {
    test('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Tag, null, "Hello, Tag!"));
        const tagContainer = getByTestId('kda-tag');
        expect(tagContainer).toBeInTheDocument();
    });
});
//# sourceMappingURL=Tag.test.js.map