import type { IFormFieldWrapperProps } from '../../Form';
import type { SystemIcon } from '../../Icon';
import type { Meta, StoryObj } from '@storybook/react';
type StoryProps = {
    helperText: string;
    leadingText: string;
    icon: keyof typeof SystemIcon;
} & IFormFieldWrapperProps;
declare const meta: Meta<StoryProps>;
type Story = StoryObj<StoryProps>;
export declare const Group: Story;
export default meta;
//# sourceMappingURL=FormFieldWrapper.stories.d.ts.map