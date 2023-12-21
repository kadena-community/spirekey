'use client';

import { Box } from '@kadena/react-ui';
import { NetworkSelector } from './NetworkSelector';

export const NavBar = () => {
  return (
    <Box padding="$md" paddingBottom="$lg">
      <NetworkSelector />
    </Box>
  );
};
