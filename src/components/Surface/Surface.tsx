import { ForwardedRef, forwardRef } from 'react';
import { background } from './Surface.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export function BaseSurface(
  { children, onClick }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={background} onClick={onClick}>
      {children}
    </div>
  );
}

export const Surface = forwardRef(BaseSurface);
