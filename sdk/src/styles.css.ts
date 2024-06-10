import { tokens } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const spirekeySidebar = style({
  border: 0,
  width: 350,
  height: '100%',
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 999999,
  transform: 'translateX(100%)',
  transition: tokens.kda.foundation.transition.animation.easeOutCubic,
});

export const spirekeySidebarOpened = style({
  transform: 'translateX(0%)',
});
