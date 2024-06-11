import { style } from '@vanilla-extract/css';

export const spirekeySidebar = style({
  border: 0,
  width: '350px',
  height: '100%',
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 999999,
  transform: 'translateX(100%)',
  // can't use tokens here, values from: https://github.com/kadena-community/design-system/blob/319723c222395cb4a1a43ed20ba333f39e1c2e49/tokens/foundation/transition.tokens.json#L35
  transition: 'transform 200ms cubic-bezier(0.33, 1, 0.68, 1)',
});

export const spirekeySidebarOpened = style({
  transform: 'translateX(0%)',
});
