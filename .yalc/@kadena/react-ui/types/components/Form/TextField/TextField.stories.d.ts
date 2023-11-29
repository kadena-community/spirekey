import type { ITextFieldProps } from '../../Form';
import { SystemIcon } from '../../Icon';
import type { Meta, StoryObj } from '@storybook/react';
type StoryProps = {
    helperText: string;
    leadingText: string;
    icon: keyof typeof SystemIcon;
} & ITextFieldProps;
declare const meta: Meta<StoryProps>;
type Story = StoryObj<StoryProps>;
export declare const Group: Story;
export default meta;
//# sourceMappingURL=TextField.stories.d.ts.map