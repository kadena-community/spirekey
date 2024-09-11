import React from 'react';
import MatchMediaMock from 'vitest-matchmedia-mock';

import { cleanup, render, screen } from '@/../tests/components/setup';

import Fingerprint from '@/components/icons/Fingerprint/Fingerprint';
import * as styles from '@/components/icons/Fingerprint/Fingerprint.css';

describe('<Fingerprint />', () => {
  const matchMediaMock = new MatchMediaMock();
  beforeAll(() => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
  });
  afterEach(() => cleanup());
  it('renders correctly with default size', () => {
    render(<Fingerprint animating={false} success={false} />);
    const svgElement = screen.getByTestId('fingerprint-icon');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '64');
    expect(svgElement).toHaveAttribute('height', '64');
  });

  it('renders correctly with custom size', () => {
    render(<Fingerprint size={128} animating={false} success={false} />);
    const svgElement = screen.getByTestId('fingerprint-icon');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '128');
    expect(svgElement).toHaveAttribute('height', '128');
  });

  it('applies animating class when animating is true', () => {
    render(<Fingerprint animating={true} success={false} />);
    const svgElement = screen.getByTestId('fingerprint-icon');
    expect(svgElement).toHaveClass(styles.animating);
  });

  it('applies success class when success is true', () => {
    render(<Fingerprint animating={false} success={true} />);
    const svgElement = screen.getByTestId('fingerprint-icon');
    expect(svgElement).toHaveClass(styles.success);
  });
});
