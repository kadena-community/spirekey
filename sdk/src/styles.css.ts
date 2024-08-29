import { token } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const spirekeyNotification = style({
  borderRadius: token('radius.lg'),
  position: 'fixed',
  border: 'none',
  width: '21.5rem',
  height: '3rem',
  right: token('spacing.md'),
  top: token('spacing.md'),
  zIndex: 999999,
  transition:
    'transform 200ms cubic-bezier(0.33, 1, 0.68, 1), right 200ms cubic-bezier(0.33, 1, 0.68, 1)',
  willChange: 'transform, right',
});

export const spirekeyNotificationMinimized = style({
  right: '0',
  transform: 'translateX(18.46rem)',
});

export const spirekeyNotificationHidden = style({
  right: 0,
  transform: 'translateX(100%)',
});
