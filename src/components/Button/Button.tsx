import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import type { ButtonProps } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';
import { Variants, button } from './SharedButton.css';

interface Props extends ButtonProps, Variants {}

function BaseButton(props: Props, ref: ForwardedRef<HTMLButtonElement>) {
  const { children, className, color,  ...restProps } = props;

  return (
    <AriaButton
      ref={ref}
      className={cn(button({ color }), className)}
      {...restProps}
    >
      {children}
    </AriaButton>
  );
};


export const Button = forwardRef(BaseButton)