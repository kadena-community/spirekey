import { ForwardedRef, forwardRef } from 'react';
import { background } from './Surface.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  onTouchStart?: () => void;
}

export function BaseSurface(
  { children, onClick, onTouchStart }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={background}
      onClick={onClick}
      onTouchStart={onTouchStart}
    >
      {children}
    </div>
  );
}

export const Surface = forwardRef(BaseSurface);
