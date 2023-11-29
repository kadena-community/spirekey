import type { FC } from 'react';
import React from 'react';
import { cardColorVariants, displayVariants } from './Notification.css';
export interface INotificationProps {
    children?: React.ReactNode;
    color?: keyof typeof cardColorVariants;
    styleVariant?: keyof typeof displayVariants;
    hasCloseButton?: boolean;
    onClose?: () => void;
    icon?: React.ReactNode;
    role: 'alert' | 'status' | 'none';
}
export declare const Notification: FC<INotificationProps>;
//# sourceMappingURL=Notification.d.ts.map