import type { FC } from 'react';
import type { INotificationActionsProps } from './NotificationActions';
import type { INotificationButtonProps } from './NotificationButton';
import type { INotificationProps } from './NotificationContainer';
export type { INotificationActionsProps, INotificationButtonProps, INotificationProps, };
interface INotification {
    Root: FC<INotificationProps>;
    Actions: FC<INotificationActionsProps>;
    Button: FC<INotificationButtonProps>;
}
export declare const Notification: INotification;
//# sourceMappingURL=index.d.ts.map