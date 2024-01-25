import classnames from 'classnames';
import { FC } from 'react';
import { wrapper } from './Button.css';

interface Props {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}

export const Button: FC<Props> = ({
  children,
  className,
  onClick,
  type = 'button',
}) => {
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
