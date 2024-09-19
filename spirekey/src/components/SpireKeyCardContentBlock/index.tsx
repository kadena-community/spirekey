import { CardContentBlock } from '@kadena/kode-ui/patterns';
import React, { ComponentProps } from 'react';

export const SpireKeyCardContentBlock = (
  props: Omit<ComponentProps<typeof CardContentBlock>, 'visual'>,
) => <CardContentBlock {...props} />;
