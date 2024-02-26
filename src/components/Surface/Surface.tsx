import classnames from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { background } from './Surface.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function BaseSurface(
  { children, className }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={classnames(background, className)}>
      {children}
    </div>
  );
}

export const Surface = forwardRef(BaseSurface);
