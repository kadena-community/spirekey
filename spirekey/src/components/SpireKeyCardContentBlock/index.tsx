import { CardContentBlock } from '@kadena/kode-ui/patterns';
import { token } from '@kadena/kode-ui/styles';
import React, { ComponentProps } from 'react';
import SpireKeyKdacolorLogoGreen from '../icons/KdaLogoGreen';

export const SpireKeyCardContentBlock = (
  props: Omit<ComponentProps<typeof CardContentBlock>, 'visual'>,
) => (
  <CardContentBlock
    {...props}
    visual={
      <SpireKeyKdacolorLogoGreen
        aria-label="SpireKey"
        fontSize={token('typography.fontSize.9xl')}
      />
    }
  />
);
