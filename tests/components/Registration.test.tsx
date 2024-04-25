import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from './setup';

describe('test component', () => {
  it('should check the text', async () => {
    const TestComp = () => <div>Hello</div>;
    render(<TestComp />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
