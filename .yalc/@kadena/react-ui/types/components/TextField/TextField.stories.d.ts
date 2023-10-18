import { SystemIcon } from '../Icon';
import type { ITextFieldProps } from '../TextField';
import type { Meta, StoryObj } from '@storybook/react';
type StoryProps = {
    helperText: string;
    leadingText: string;
    leftIcon: keyof typeof SystemIcon;
    rightIcon: keyof typeof SystemIcon;
} & ITextFieldProps;
declare const meta: Meta<StoryProps>;
type Story = StoryObj<StoryProps>;
export declare const Group: Story;
export default meta;
//# sourceMappingURL=TextField.stories.d.ts.map