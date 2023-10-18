import type { ILinkProps } from '../Link';
import type { Meta, StoryObj } from '@storybook/react';
import { SystemIcon } from '../Icon';
declare const meta: Meta<{
    selectIcon: keyof typeof SystemIcon;
} & ILinkProps>;
export default meta;
type Story = StoryObj<{
    selectIcon: keyof typeof SystemIcon;
} & ILinkProps>;
export declare const Primary: Story;
//# sourceMappingURL=Link.stories.d.ts.map