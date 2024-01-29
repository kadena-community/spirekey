import { ForwardedRef, forwardRef } from 'react';
import { background } from './Surface.css';

interface Props {
  children: React.ReactNode;
}

export function BaseSurface(
  { children }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={background}>
      {children}
    </div>
  );
}

export const Surface = forwardRef(BaseSurface);
