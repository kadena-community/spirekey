import cn from 'classnames';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import type { Variants } from '../Button/SharedButton.css';
import { button } from '../Button/SharedButton.css';

interface LinkProps
  extends Variants,
    Omit<ComponentProps<typeof Link>, 'color'> {
  children: React.ReactNode;
  className?: string;
}

export function ButtonLink(props: LinkProps) {
  const { children, className, variant, ...restProps } = props;

  return (
    <Link className={cn(button({ variant }), className)} {...restProps}>
      {children}
    </Link>
  );
}
