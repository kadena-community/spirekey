import { SystemIcon } from '../../Icon';
import type { Meta, StoryObj } from '@storybook/react';
import type { ISelectProps } from './Select';
declare const meta: Meta<ISelectProps>;
export default meta;
type Story = StoryObj<{
    icon: keyof typeof SystemIcon;
} & Omit<ISelectProps, 'icon'>>;
export declare const Dynamic: Story;
//# sourceMappingURL=Select.stories.d.ts.map