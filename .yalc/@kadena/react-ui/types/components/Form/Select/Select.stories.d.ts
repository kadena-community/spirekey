import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import type { ISelectProps } from './Select';
declare const meta: Meta<ISelectProps>;
export default meta;
type Story = StoryObj<{
    startIcon: React.ReactElement | '-';
} & Omit<ISelectProps, 'startIcon'>>;
export declare const Dynamic: Story;
//# sourceMappingURL=Select.stories.d.ts.map