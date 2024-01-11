import type { FC } from 'react';
import React from 'react';
import { actionButtonIntentVariants } from './Notification.css';
export interface INotificationButtonProps {
    intent: keyof typeof actionButtonIntentVariants;
    onClick?: () => void;
    children: React.ReactNode;
    icon: React.ReactElement;
}
export declare const NotificationButton: FC<INotificationButtonProps>;
//# sourceMappingURL=NotificationButton.d.ts.map