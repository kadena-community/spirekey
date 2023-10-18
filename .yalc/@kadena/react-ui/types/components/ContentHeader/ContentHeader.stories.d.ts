import type { IContentHeaderProps } from '../ContentHeader';
import { SystemIcon } from '../Icon';
import type { Meta, StoryObj } from '@storybook/react';
declare const meta: Meta<{
    selectIcon: keyof typeof SystemIcon;
} & IContentHeaderProps>;
export default meta;
type Story = StoryObj<{
    selectIcon: keyof typeof SystemIcon;
} & IContentHeaderProps>;
export declare const Primary: Story;
//# sourceMappingURL=ContentHeader.stories.d.ts.map