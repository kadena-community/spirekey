import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ComponentProps, ReactNode } from 'react';
import React from 'react';
import type { AriaLinkOptions, HoverEvents } from 'react-aria';
import { button } from './SharedButton.css';
type Variants = Omit<NonNullable<RecipeVariants<typeof button>>, 'onlyIcon'>;
type PickedAriaLinkProps = Omit<AriaLinkOptions, 'elementType'>;
export interface ILinkButtonProps extends PickedAriaLinkProps, HoverEvents, Variants {
    className?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    icon?: ReactNode;
    children?: ReactNode;
    onClick?: ComponentProps<'button'>['onClick'];
    style?: ComponentProps<'button'>['style'];
    title?: ComponentProps<'button'>['title'];
}
export declare const LinkButton: React.ForwardRefExoticComponent<ILinkButtonProps & React.RefAttributes<HTMLAnchorElement>>;
export {};
//# sourceMappingURL=LinkButton.d.ts.map