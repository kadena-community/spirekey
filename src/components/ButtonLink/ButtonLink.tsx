import cn from 'classnames';
import Link from 'next/link';
import type { ComponentProps, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import type { Variants } from '../Button/SharedButton.css';
import { button } from '../Button/SharedButton.css';

interface LinkProps
  extends Variants,
    Omit<ComponentProps<typeof Link>, 'color'> {
  children: React.ReactNode;
  className?: string;
}

export function ButtonLink(props: LinkProps) {
  const { children, className, color, ...restProps } = props;

  return (
    <Link className={cn(button({ color }), className)} {...restProps}>
      {children}
    </Link>
  );
}
