import type { SystemIcon } from '../Icon';
import type { IInputWrapperProps } from '../InputWrapper';
import type { Meta, StoryObj } from '@storybook/react';
type StoryProps = {
    helperText: string;
    leadingText: string;
    leftIcon: keyof typeof SystemIcon;
    rightIcon: keyof typeof SystemIcon;
} & IInputWrapperProps;
declare const meta: Meta<StoryProps>;
type Story = StoryObj<StoryProps>;
export declare const Group: Story;
export default meta;
//# sourceMappingURL=InputWrapper.stories.d.ts.map