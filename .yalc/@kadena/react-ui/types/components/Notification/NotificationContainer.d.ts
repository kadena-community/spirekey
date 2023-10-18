import { SystemIcon } from '../Icon';
import type { FC } from 'react';
import React from 'react';
import type { colorVariants } from './Notification.css';
import { displayVariants } from './Notification.css';
export interface INotificationProps {
    icon?: keyof typeof SystemIcon;
    title?: string;
    children?: React.ReactNode;
    expanded?: boolean;
    color?: keyof typeof colorVariants;
    hasCloseButton?: boolean;
    onClose?: () => void;
    variant?: keyof typeof displayVariants;
    inline?: boolean;
}
export declare const NotificationContainer: FC<INotificationProps>;
//# sourceMappingURL=NotificationContainer.d.ts.map