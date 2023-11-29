import type { FC } from 'react';
import React from 'react';
import { actionButtonColorVariants } from './Notification.css';
export interface INotificationButtonProps {
    color: keyof typeof actionButtonColorVariants;
    onClick?: () => void;
    children: React.ReactNode;
}
export declare const NotificationButton: FC<INotificationButtonProps>;
//# sourceMappingURL=NotificationButton.d.ts.map