import classnames from 'classnames';
import { FC } from 'react';
import { wrapper } from './Button.css';

interface Props {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button className={classnames(wrapper, className)} onClick={onClick}>
      {children}
    </button>
  );
};
