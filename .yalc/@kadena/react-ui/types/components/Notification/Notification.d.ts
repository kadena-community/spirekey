import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { FC } from 'react';
import React from 'react';
import { notificationRecipe } from './Notification.css';
type Variants = NonNullable<RecipeVariants<typeof notificationRecipe>>;
export interface INotificationProps extends Variants {
    children?: React.ReactNode;
    isDismissable?: boolean;
    onDismiss?: () => void;
    icon?: React.ReactNode;
    role: 'alert' | 'status' | 'none';
}
export declare const Notification: FC<INotificationProps>;
export {};
//# sourceMappingURL=Notification.d.ts.map