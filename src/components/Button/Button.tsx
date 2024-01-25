import classnames from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import { wrapper } from './Button.css';

interface Props {
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}

export const Button: FC<Props> = ({
  children,
  className,
  onClick,
  type = 'button',
  href = '',
}) => {
  if (href)
    return (
      <Link href={href} className={classnames(wrapper, className)}>
        {children}
      </Link>
    );
  return (
    <button
      className={classnames(wrapper, className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
