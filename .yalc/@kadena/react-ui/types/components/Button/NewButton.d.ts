import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ComponentProps, ReactNode } from 'react';
import React from 'react';
import type { AriaButtonProps, HoverEvents } from 'react-aria';
import { button } from './SharedButton.css';
type Variants = Omit<NonNullable<RecipeVariants<typeof button>>, 'onlyIcon'>;
type PickedAriaButtonProps = Omit<AriaButtonProps, 'href' | 'target' | 'rel' | 'elementType'>;
export interface IButtonProps extends PickedAriaButtonProps, HoverEvents, Variants {
    className?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    icon?: ReactNode;
    onClick?: ComponentProps<'button'>['onClick'];
    style?: ComponentProps<'button'>['style'];
    title?: ComponentProps<'button'>['title'];
}
export declare const Button: React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=NewButton.d.ts.map